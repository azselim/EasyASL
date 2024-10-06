'use client';

import React, { useState, useEffect } from 'react';
import CaptureAndProcess from '@/app/components/CaptureAndProcess';
import StartTest from '@/app/components/StartTest';

// Word bank and index management
const wordbank = ["I", "you", "?", "thirsty", "more", "good", "bad", "hello", "want", "more"];

// Fisher-Yates Shuffle Algorithm
  for (let i = wordbank.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wordbank[i], wordbank[j]] = [wordbank[j], wordbank[i]]; // Swap elements
  }

const ExamPage = () => {

console.log(wordbank);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  // Score management
  const [score, setScore] = useState<number>(0);

  // Question and processing state
  const [photoTaken, setPhotoTaken] = useState(false);
  const [processing, setProcessing] = useState<number>(0);

  // Reset score on page reload
  useEffect(() => {
    setScore(0);
  }, []);

  // Function to move to the next question and reset components
  const goToNextQuestion = () => {
    setProcessing(0);   // Reset processing state
    setPhotoTaken(false); // Reset photoTaken state
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordbank.length); // Move to the next word
  };

  // Function to increment the score
  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  if (currentWordIndex >= 4) {
    return (
      <div>
        <h1>Test Complete</h1>
        <h2>{score >= 3 ? 'Pass' : 'Fail'}</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>Certification Page</h1>
      <h2>Score: {score}</h2> {/* Display current score */}
      {}
      <h2>Progress: {currentWordIndex+1}/4</h2>

      {/* Start Test Button */}
      <StartTest
        key={`start-${currentWordIndex}`} // Unique key to reset this component
        message={wordbank[currentWordIndex]}
        setPhotoTaken={setPhotoTaken}
        processing={processing}
        currentWordIndex={currentWordIndex}
      />

      {/* Capture and Process Component */}
      <CaptureAndProcess
        key={`capture-${currentWordIndex}`} // Unique key to reset this component
        photoTaken={photoTaken}
        setProcessing={setProcessing}
        correctWord={wordbank[currentWordIndex]}
        incrementScore={incrementScore}
        processing={processing}
        goToNextQuestion={goToNextQuestion}  // Pass the function to move to the next question
      />

      {/* "Next Question" button shown only when processing is complete */}
      {processing === 3 || processing === 4 ? (
        <a className="footer-button" onClick={goToNextQuestion} style={{ fontSize: '24px', padding: '15px 30px', width: '200px', textAlign: 'center' }}>Next</a>
      ) : null}
    </div>
  );
};

export default ExamPage;
