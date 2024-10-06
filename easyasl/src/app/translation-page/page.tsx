'use client'
import Image from "next/image";
import React, { useState } from 'react';
import CaptureAndProcess from '../components/CaptureAndProcess'; 
import CameraCapture from '../components/CameraCapture';
import texttospeech from '../components/translation'


export default function TranslationPage() {
  const [message, setMessage] = useState('Two-Way Translation');
  const handleClick = () => {
    postMessage('Translation in progress...');
  };

  return (
    <div>
      <h1>Translating </h1>
      <p>This is the content of the translation page.</p>

        <div>
          <button onClick={handleClick}>Two-Way-Translation</button>
          <p>{message}</p>
        </div>
      
      {/* Import and use the CameraCapture component */}
      <CaptureAndProcess/>
    </div>
  );
}