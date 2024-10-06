'use client'
import React, { useState } from 'react';
import CaptureAndProcess from '../components/CaptureAndProcess'; 
import CameraCapture from '../components/CameraCapture';
import TextToSpeech from '../components/TexttoSpeech';
import SpeechToText from '../components/SpeechToText_';

export default function TranslationPage() {
  const [message, setMessage] = useState('');

  const handleASLToEnglish = () => {
    setMessage('Processing ASL to speech...');
    // CaptureAndProcess();
    // texttospeech();
  };

  const handleTwoWayTranslation = () => {
    setMessage('Performing two-way translation...');
    handleASLToEnglish();
  };
  
  return (
    <div>
      <h1>Translating</h1>
      <p>{message}</p>

      {/* Wrapping components inside div instead of button to avoid nesting */}
      <div style={{ margin: '10px' }}>
        <button style={{ fontSize: '24px', padding: '15px' }} onClick={handleASLToEnglish}>
          Start ASL to English Translation
        </button>
      </div>

      <div style={{ margin: '10px' }}>
        <SpeechToText />
      </div>

      <div style={{ margin: '10px' }}>
        <TextToSpeech />
      </div>
    </div>
  );
}
