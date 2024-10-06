'use client'
import Image from "next/image";
import React from 'react';
import CaptureAndProcess from '../components/CaptureAndProcess'; // Adjust the path based on your folder structure

export default function TranslationPage() {
  return (
    <div>
      <h1>Translating </h1>
      <p>This is the content of the translation page.</p>
      
      {/* Import and use the CameraCapture component */}
      <CaptureAndProcess/>
    </div>
  );
}