'use client';

import React, { useState, useEffect } from 'react';
import CaptureAndProcess from '@/app/components/CaptureAndProcess';
import StartTest from '@/app/components/StartTest';

const TestPage = ({ correctWord }: { correctWord: string }) => {
  const [photoTaken, setPhotoTaken] = useState(false);
  const [processing, setProcessing] = useState(0);
  const [score, setScore] = useState(0);

  // Function to move to the next question
  const goToNextQuestion = () => {
    setProcessing(0);
    setPhotoTaken(false);
  };

  // Function to increment the score
  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div>
      <h1>Camera Capture Page</h1>
      <h2>Score: {score}</h2> {/* Display current score */}
      <StartTest message={correctWord} setPhotoTaken={setPhotoTaken} processing={processing} />
      <CaptureAndProcess
        photoTaken={photoTaken}
        setProcessing={setProcessing}
        correctWord={correctWord}
        incrementScore={incrementScore}
        processing={processing}
        goToNextQuestion={goToNextQuestion}  // Pass `goToNextQuestion`
      />
      {/* Show "Next Question" button if processing is complete */}
      {processing === 3 || processing === 4 ? (
        <button onClick={goToNextQuestion}>Next Question</button>
      ) : null}
    </div>
  );
};

export default TestPage;
