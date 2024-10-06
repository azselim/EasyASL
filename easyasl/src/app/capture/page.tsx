'use client';

import React, { useState, useEffect } from 'react';
import CameraCapture from '@/app/components/CaptureAndProcess';
import StartTest from '@/app/components/StartTest';

const CapturePage = () => {
  const [photoTaken, setPhotoTaken] = useState(false);

  useEffect(() => {
    if (photoTaken) {
      console.log("Photo has been taken!");
    }
  }, [photoTaken]); // Effect runs when photoTaken changes

  return (
    <div>
      <h1>Camera Capture Page</h1>
      <StartTest message="want" setPhotoTaken={setPhotoTaken} />
      <CameraCapture photoTaken={photoTaken} /> {/* Pass photoTaken as a prop */}
    </div>
  );
};

export default CapturePage;
