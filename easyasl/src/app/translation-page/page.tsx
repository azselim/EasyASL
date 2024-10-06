'use client'
import React, { useState } from 'react';
import CaptureAndProcess from '../components/CaptureAndProcess';
import CameraCapture from '../components/CameraCapture';
import TextToSpeech from '../components/TexttoSpeech';
import SpeechToText from '../components/SpeechToText_';

export default function TranslationPage() {
  const [message, setMessage] = useState('');

  const handleASLToEnglish = () => {
    setMessage('Processing ASL to English translation...');
  };

  const handleTwoWayTranslation = () => {
    setMessage('Performing two-way translation...');
    handleASLToEnglish();
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '40px auto',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      
      {/* Title */}
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#000' // Change the title color to black
      }}>
        Translation Page
      </h1>

      {/* Status Message */}
      <p style={{
        fontSize: '1.2rem',
        marginBottom: '30px',
        color: '#000' // Change status message color to black
      }}>
        {message || 'Please select a translation option below.'}
      </p>

      {/* Button to trigger ASL to English */}
      <button 
        onClick={handleASLToEnglish}
        style={{
          fontSize: '1.2rem',
          padding: '15px 30px',
          margin: '10px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007BFF')}
      >
        Translate ASL to English
      </button>

      {/* Button to trigger Two-Way Translation */}
      <button 
        onClick={handleTwoWayTranslation}
        style={{
          fontSize: '1.2rem',
          padding: '15px 30px',
          margin: '10px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
      >
        Perform Two-Way Translation
      </button>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '40px',
        gap: '20px'
      }}>

        {/* Speech to Text Component */}
        <div style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ marginBottom: '15px', color: '#000' }}>Speech to Text</h2> {/* Set to black */}
          <SpeechToText />
        </div>

        {/* Text to Speech Component */}
        <div style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ marginBottom: '15px', color: '#000' }}>Text to Speech</h2> {/* Set to black */}
          <TextToSpeech />
        </div>

      </div>

    </div>
  );
}