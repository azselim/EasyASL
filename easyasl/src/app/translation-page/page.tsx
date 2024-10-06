'use client'
import Image from "next/image";
import React, { useState } from 'react';
import CaptureAndProcess from '../components/CaptureAndProcess'; 
import CameraCapture from '../components/CameraCapture';
import texttospeech from '../components/translation'


export default function TranslationPage() {
  return (
    <div>
      <h1>Translating </h1>
      <p>This is the content of the translation page.</p>

      const hello: React.FC = () => {
        const [message, setMessage] = useState('Two-Way Translation');
        const handleClick = () => {
          postMessage('');
        };
      };

      return (
        <div>
          <button onClick={handleClick}>Two-Way-Translation</button>
          <p>{message}</p>
        </div>
      )
      {/* Import and use the CameraCapture component */}
      <CaptureAndProcess/>
    </div>
  );
}

export default MyComponent;