import React, { useState } from 'react';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startDictation = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();

      recognition.continuous = false; // Stop automatically after the user stops speaking
      recognition.interimResults = false; // Do not return interim results

      recognition.lang = 'en-US'; // Set language to English (US)

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        setIsListening(false);
        recognition.stop();
      };

      recognition.onerror = (event) => {
        console.error('Error occurred in recognition: ' + event.error);
        setIsListening(false);
        recognition.stop();
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Sorry, your browser doesn't support speech recognition.");
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', border: '1px'}}>
      <button
        onClick={startDictation}
        disabled={isListening}
        style={{ fontSize: '18px', padding: '10px 20px', border: '1px' }}
      >
        {isListening ? 'Listening...' : 'Start Dictation'}
      </button>
      <p
        id="transcript"
        style={{ marginTop: '30px', fontSize: '20px', fontWeight: 'bold', border: '1px'}}
      >
        {transcript}
      </p>
    </div>
  );
};

export default SpeechToText;
