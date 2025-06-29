// frontend/src/utils/textToSpeech.js

export const speakText = (text, lang = 'en-IN', speed = 1, volume = 1, onEnd = () => {}) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);

  // Normalize Indian languages to Hindi voice
  const indianLangs = ['hi', 'kn', 'te', 'ta', 'ml', 'mr', 'gu', 'pa', 'bn', 'ur'];
  const langCode = lang.split('-')[0]; // e.g., 'kn' from 'kn-IN'
  const effectiveLang = indianLangs.includes(langCode) ? 'hi-IN' : lang;

  const voices = synth.getVoices();

  const preferredVoice =
    voices.find(v => v.lang === effectiveLang) ||
    voices.find(v => v.lang.startsWith(effectiveLang.split('-')[0])) ||
    voices.find(v => v.lang.startsWith('en')); // fallback to English

  utterance.voice = preferredVoice || null;
  utterance.lang = effectiveLang;
  utterance.rate = speed;
  utterance.volume = volume;

  console.log('🗣️ Speech synthesis started with params:', {
    text,
    lang: effectiveLang,
    speed,
    volume
  });

  utterance.onstart = () => console.log('✅ Speech started');

  utterance.onend = () => {
    console.log('✅ Speech ended');
    setTimeout(() => {
      onEnd(); // Callback after 3 sec
    }, 1000);
  };

  synth.cancel(); // stop any ongoing speech
  synth.speak(utterance);
};

export const stopSpeech = () => {
  window.speechSynthesis.cancel();
};
