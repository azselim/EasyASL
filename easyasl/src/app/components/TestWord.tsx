'use client';

import React, { useState, useEffect } from 'react';
import CaptureAndProcess from '@/app/components/CaptureAndProcess';
import StartTest from '@/app/components/StartTest';

const TestPage = ({ correctWord }: {correctWord: string}) => {
  const [photoTaken, setPhotoTaken] = useState(false);
  const [processing, setProcessing] = useState(0);

  useEffect(() => {
    if (photoTaken) {
      console.log("Photo has been taken!");
    }
  }, [photoTaken]); // Effect runs when photoTaken changes

  return (
    <div>
      <h1>Camera Capture Page</h1>
      <StartTest message={correctWord} setPhotoTaken={setPhotoTaken} processing={processing} />
      <CaptureAndProcess photoTaken={photoTaken} setProcessing={setProcessing} correctWord={correctWord} /> {/* Pass photoTaken as a prop */}
    </div>
  );
};

export default TestPage;
