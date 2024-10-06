'use client'
import React, { useState } from 'react';
import CameraCapture from '../components/CameraCaptureAuto'; 
import showCameraCapture from '../components/CameraCaptureAuto'; 
import texttospeech from '../components/TexttoSpeech'
import speechtotext from '../components/SpeechtoText'
import getUserMedia

export default function TranslationPage() {
  const [message, setMessage] = useState('');

  const StartTest = ({ message, setPhotoTaken, processing }: { message: string, setPhotoTaken: React.Dispatch<React.SetStateAction<boolean>>, processing: number}) => {
    const [showComponent, setShowComponent] = useState(false);
  
  setMessage('Translating speech to text...');

  const handleEnglishtoText = async () => {
    let stream = MediaStream | null = null;

    const constraints = {
      audio: true,
    };

    try {
      let stream = await navigator.mediaDevices.getUserMedia(constraints);

    } catch (err) {
      console.error("Error accessing microphone", err);
    }
    const formData = new FormData();
    formData.append("audioFilePath", stream);
    
    const response = await fetch('/api/speechtotext', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);

    
  };

  const handleASLToEnglish = () => {
    setMessage('Coming soon...');
  };

  const handleTwoWayTranslation = () => {
    setMessage('Coming soon...');
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