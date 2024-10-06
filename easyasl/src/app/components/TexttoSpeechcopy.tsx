import React, { useState } from 'react';

interface TextToSpeechProps {
  text: string; // Accept the text as a prop
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
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
      <br />
      <button
        onClick={speakText}
        disabled={isSpeaking || text.trim() === ''}
        style={{ marginTop: '20px', fontSize: '30px', padding: '10px 20px' }}
      >
        {isSpeaking ? 'Speaking...' : 'Speak'}
      </button>
    </div>
  );
};

export default TextToSpeech;
