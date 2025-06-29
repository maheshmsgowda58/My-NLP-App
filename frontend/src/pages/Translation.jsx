import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import InputOutputBox from "../components/InputOutputBox";
import LanguageSelector from "../components/LanguageSelector";
import { translateText } from "../services/translationService";
import { downloadAsPDF } from "../utils/downloadPDF";
import { toast } from "react-toastify";
import GenerateButton from "../components/GenerateButton";
import CopyButton from "../components/CopyButton";
import DownloadButton from "../components/DownloadButton";
import CheckboxButton from "../components/CheckboxButton";
import MicVisualizer from "../components/MicVisualizer";
import { startSpeechToText, stopSpeechToText } from "../utils/speechToText";
import { speakText, stopSpeech } from "../utils/textToSpeech";
import "../styles/Translation.css";

const Translation = () => {
  const { user } = useAuth();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("en");
  const [outputLanguage, setOutputLanguage] = useState("kn");
  const [dontSave, setDontSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const recognitionRef = useRef(null);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast.warn("Please enter text to translate.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        userId: user?.userId,
        username: user?.username,
        inputText,
        inputLanguage,
        outputLanguage,
        saved: !dontSave,
      };

      const result = await translateText(payload);
      const translatedText = result?.outputText;

      if (translatedText) {
        setOutputText(translatedText);
        toast.success("Translation successful!");
      } else {
        setOutputText("Translation failed.");
        toast.error("Translation failed.");
      }
    } catch (error) {
      console.error(error);
      setOutputText("Translation failed.");
      toast.error("Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    if (!outputText) return;
    downloadAsPDF(inputText, outputText, "translation", {
      inputLanguage,
      outputLanguage,
      username: user?.username || "Guest",
    });
    toast.success("⬇️Downloaded as PDF!");
  };

  const handleStartListening = () => {
    const langCode = inputLanguage + "-IN"; // fallback format
    recognitionRef.current = startSpeechToText(setInputText, langCode);
    setIsListening(true);
  };

  const handleStopListening = () => {
    stopSpeechToText(recognitionRef.current);
    setIsListening(false);
  };

  const handleSpeak = () => {
    if (outputText) {
      const langCode = outputLanguage + "-IN";
      speakText(outputText, langCode, speed, volume,() => setIsSpeaking(false));
      setIsSpeaking(true);
    }
  };

  const handleStopSpeaking = () => {
    stopSpeech();
    setIsSpeaking(false);
  };

  return (
    <div className="translation-container">
      <h2>🌍 Translate Text</h2>

      <div className="translate-input">
        <div className="lang-selectors">
          <LanguageSelector
            label="From:"
            selected={inputLanguage}
            onChange={setInputLanguage}
          />
          <LanguageSelector
            label="To:"
            selected={outputLanguage}
            onChange={setOutputLanguage}
          />
        </div>

        <div className="translate-button">
          <GenerateButton
            text={loading ? "Translating..." : "Translate"}
            onClick={handleTranslate}
            disabled={loading || !inputText.trim()}
          />
        </div>
      </div>

      <MicVisualizer isListening={isListening} />
      <div className="voice-controls">
        <button onClick={handleStartListening} disabled={isListening}>
          🎙️ Start Listening
        </button>
        <button onClick={handleStopListening} disabled={!isListening}>
          🛑 Stop Listening
        </button>
        <button onClick={handleSpeak} disabled={isSpeaking || !outputText}>
          🔊 Start Speaking
        </button>
        <button onClick={handleStopSpeaking} disabled={!isSpeaking}>
          ⛔ Stop Speaking
        </button>
        <label>
          🔈 Volume:
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </label>
        <label>
          ⚡ Speed:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
        </label>
      </div>

      <InputOutputBox
        inputText={inputText}
        setInputText={setInputText}
        outputText={outputText}
        onCopy={handleCopy}
        onDownload={handleDownload}
        loading={loading}
        disableCopy={!outputText}
        disableDownload={!outputText}
        placeholder="Enter text to translate..."
        CopyButton={CopyButton}
        DownloadButton={DownloadButton}
      />

      <div className="actions">
        <div className="toggle-with-label">
          <CheckboxButton
            id="dontSaveToggle"
            checked={dontSave}
            onChange={(e) => setDontSave(e.target.checked)}
          />
          <span className="toggle-label-text">Don't save to history</span>
        </div>
      </div>
    </div>
  );
};

export default Translation;

