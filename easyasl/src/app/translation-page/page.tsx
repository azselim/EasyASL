'use client'
import React, { useState } from 'react';
import CaptureAndProcess from '../components/CaptureAndProcess'; 
import CameraCapture from '../components/CameraCapture';
import texttospeech from '../components/TexttoSpeech'
import speechtotext from '../components/SpeechtoText'


export default function TranslationPage() {
  const [message, setMessage] = useState('');

  const handleEnglishtoText = () => {
    setMessage('Translating speech to text...');
    speechtotext();
  };

  const handleASLToEnglish = () => {
    setMessage('Processing ASL to speech...');
    CaptureAndProcess();
    texttospeech();
  };

  const handleTwoWayTranslation = () => {
    setMessage('Performing two-way translation...');
    handleEnglishtoText();
    handleASLToEnglish();
  };
  
  return (
    <div>
      <h1>Translating</h1>
      <p>{message}</p>

            <button onClick={handleTwoWayTranslation} style={{ fontSize: '24px', padding: '15px', margin: '10px' }}>
        Two-Way Translation
      </button>

      <button onClick={handleEnglishtoText} style={{ fontSize: '24px', padding: '15px', margin: '10px' }}>
        English to Text
      </button>

      <button onClick={handleASLToEnglish} style={{ fontSize: '24px', padding: '15px', margin: '10px' }}>
        ASL to Spoken English
      </button>
    </div>
  );
  }