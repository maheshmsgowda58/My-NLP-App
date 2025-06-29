// frontend/src/utils/speechToText.js
export const startSpeechToText = (onResult, language = 'en-IN') => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.error('🚫 Speech recognition not supported in this browser.');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = language;
  recognition.interimResults = true;
  recognition.continuous = true;

  recognition.onstart = () => console.log('🎤 Speech recognition started');
  recognition.onerror = (event) => console.error('❌ Speech recognition error:', event.error);
  recognition.onend = () => console.log('🛑 Speech recognition ended');

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    onResult(transcript);
  };

  recognition.start();
  return recognition;
};

export const stopSpeechToText = (recognitionInstance) => {
  if (recognitionInstance) {
    recognitionInstance.stop();
  }
};
