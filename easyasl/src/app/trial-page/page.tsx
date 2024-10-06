//for education
import Image from "next/image";
import React from 'react';
import CaptureAndProcess from '../components/CaptureAndProcess'; // Adjust the path based on your folder structure


export default function trialpage() {
  return (
    <div>
      <h1>Practice</h1>
      <p>This is the content of the Practice page.</p>
       {/* Import and use the CameraCapture component */}
       <CaptureAndProcess/>
    </div>
  );
}