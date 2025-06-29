import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import InputOutputBox from "../components/InputOutputBox";
import { summarizeText } from "../services/summarizationService";
import { downloadAsPDF } from "../utils/downloadPDF";
import { toast } from "react-toastify";
import GenerateButton from "../components/GenerateButton";
import CopyButton from "../components/CopyButton";
import DownloadButton from "../components/DownloadButton";
import CheckboxButton from "../components/CheckboxButton";
import MicVisualizer from "../components/MicVisualizer";
import { startSpeechToText, stopSpeechToText } from "../utils/speechToText";
import { speakText, stopSpeech } from "../utils/textToSpeech";
import "../styles/Summarization.css";

const Summarization = () => {
  const { user } = useAuth();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [summaryType, setSummaryType] = useState("abstractive");
  const [summaryLength, setSummaryLength] = useState("medium");
  const [dontSave, setDontSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const recognitionRef = useRef(null);

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    setLoading(true);

    const payload = {
      userId: user?.userId,
      username: user?.username,
      inputText,
      summaryType,
      summaryLength,
      saved: !dontSave,
    };

    try {
      const response = await summarizeText(payload);
      const summary = response?.summary?.text || response?.summary || response?.summary_text || null;

      if (summary) {
        setOutputText(summary);
        toast.success("✅ Summary generated!");
      } else {
        setOutputText("Summarization failed.");
        toast.error("❌ Failed to summarize text.");
      }
    } catch (error) {
      console.error("Error during summarization:", error);
      setOutputText("Summarization failed.");
      toast.error("❌ Error while summarizing.");
    }

    setLoading(false);
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    toast.success("📋 Copied to clipboard!");
  };

  const handleDownload = () => {
    if (!outputText) return;
    downloadAsPDF(inputText, outputText, "summary", {
      summaryType,
      summaryLength,
      username: user?.username || "Guest",
    });
    toast.success("⬇️ Downloaded as PDF!");
  };

  const handleStartListening = () => {
    setIsListening(true);
    recognitionRef.current = startSpeechToText(setInputText, "en-IN");
  };

  const handleStopListening = () => {
    stopSpeechToText(recognitionRef.current);
    setIsListening(false);
  };

  const handleSpeak = () => {
    if (outputText) {
      speakText(outputText, "en-IN", speed, volume,() => setIsSpeaking(false));
      setIsSpeaking(true);
    }
  };

  const handleStopSpeaking = () => {
    stopSpeech();
    setIsSpeaking(false);
  };

  return (
    <div className="summarization-container">
      <h2>📝 Summarize Text</h2>

      <div className="summary-input">
        <div className="left-controls">
          <div className="filter-buttons">
            <button onClick={() => setSummaryType("abstractive")} className={summaryType === "abstractive" ? "active-filter" : ""}>Abstractive</button>
            <button onClick={() => setSummaryType("extractive")} className={summaryType === "extractive" ? "active-filter" : ""}>Extractive</button>
          </div>
          <div className="sort-buttons">
            <button onClick={() => setSummaryLength("short")} className={summaryLength === "short" ? "active-filter" : ""}>Short</button>
            <button onClick={() => setSummaryLength("medium")} className={summaryLength === "medium" ? "active-filter" : ""}>Medium</button>
            <button onClick={() => setSummaryLength("long")} className={summaryLength === "long" ? "active-filter" : ""}>Long</button>
          </div>
        </div>

        <div className="summarize-button">
          <GenerateButton text={loading ? "Summarizing..." : "Summarize"} onClick={handleSummarize} disabled={loading || !inputText.trim()} />
        </div>
      </div>

      <MicVisualizer isListening={isListening} />
      <div className="voice-controls">
        <button onClick={handleStartListening} disabled={isListening}>🎙️ Start Listening</button>
        <button onClick={handleStopListening} disabled={!isListening}>🛑 Stop Listening</button>
        <button onClick={handleSpeak} disabled={isSpeaking || !outputText}>🔊 Start Speaking</button>
        <button onClick={handleStopSpeaking} disabled={!isSpeaking}>⛔ Stop Speaking</button>
        <label>🔈 Volume: <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} /></label>
        <label>⚡ Speed: <input type="range" min="0.5" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} /></label>
      </div>

      <InputOutputBox
        inputText={inputText}
        setInputText={setInputText}
        outputText={outputText}
        onCopy={handleCopy}
        onDownload={handleDownload}
        loading={loading}
        CopyButton={CopyButton}
        DownloadButton={DownloadButton}
      />

      <div className="actions">
        <div className="toggle-with-label">
          <CheckboxButton id="dontSaveToggle" checked={dontSave} onChange={(e) => setDontSave(e.target.checked)} />
          <span className="toggle-label-text">Don't save to history</span>
        </div>
      </div>
    </div>
  );
};

export default Summarization;
