'use client';

import React, { useState, useEffect } from 'react';
import CaptureAndProcess from '@/app/components/CameraMax';
import StartTest from '@/app/components/StartTestcopy';

interface TestPageProps {
  correctWord: string;
  onWordCaptured: (word: string) => void; // Callback to send the captured word to the parent
}

const TestPage: React.FC<TestPageProps> = ({ correctWord, onWordCaptured }) => {
  const [photoTaken, setPhotoTaken] = useState(false);
  const [processing, setProcessing] = useState(0);

  // Function to handle when a word is captured
  const handleWordCaptured = (word: string) => {
    onWordCaptured(word); // Send the word to the parent
  };

  return (
    <div>
      <StartTest message={correctWord} setPhotoTaken={setPhotoTaken} processing={processing} />
      <CaptureAndProcess
        photoTaken={photoTaken}
        setProcessing={setProcessing}
        correctWord={correctWord}
        onWordCaptured={handleWordCaptured} // Pass the callback function
        processing={processing}
      />
    </div>
  );
};

export default TestPage;
