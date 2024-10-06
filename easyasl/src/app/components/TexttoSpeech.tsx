import React, { useState } from 'react';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Set language to English (US)

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (event) => {
        console.error('Error occurred in speech synthesis: ' + event.error);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text to speech.");
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to speak"
        rows={5}
        style={{ width: '80%', fontSize: '16px', padding: '10px' }}
      ></textarea>
      <br />
      <button
        onClick={speakText}
        disabled={isSpeaking || text.trim() === ''}
        style={{ marginTop: '20px', fontSize: '18px', padding: '10px 20px' }}
      >
        {isSpeaking ? 'Speaking...' : 'Speak'}
      </button>
    </div>
  );
};

export default TextToSpeech;
