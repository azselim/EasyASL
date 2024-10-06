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
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState<number>(0);
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
      <div style={styles.container}>
        <h1 style={styles.heading}>Test Complete</h1>
        <h2 style={styles.resultText}>{score >= 3 ? 'Pass' : 'Fail'}</h2>
        {(score >= 3) &&
        <a className="footer-button" href="/certificate">Get your certificate!</a>}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Certification Test</h1>

      {/* Score and Progress Board */}
      <div style={styles.scoreBoard}>
        <h2 style={styles.scoreText}>Score: {score}</h2>
        <h2 style={styles.progressText}>Progress: {currentWordIndex + 1}/4</h2>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressContainer}>
        <div style={{ ...styles.progressBar, width: `${((currentWordIndex + 1) / 4) * 100}%` }}></div>
      </div>

      {/* Start Test Component */}
      <StartTest
        key={`start-${currentWordIndex}`} // Unique key to reset this component
        message={wordbank[currentWordIndex]}
        setPhotoTaken={setPhotoTaken}
        processing={processing}
        currentWordIndex={currentWordIndex}
      />

      {/* Capture and Process Component */}
      <div style={styles.captureContainer}>
        <CaptureAndProcess
          key={`capture-${currentWordIndex}`} // Unique key to reset this component
          photoTaken={photoTaken}
          setProcessing={setProcessing}
          correctWord={wordbank[currentWordIndex]}
          incrementScore={incrementScore}
          processing={processing}
          goToNextQuestion={goToNextQuestion}
          
        />
      </div>

      {/* Centered interactive loading spinner */}
      {processing > 0 && processing < 3 ? (
        <div style={styles.spinnerContainer}>
          <div className="spinner"></div>
          <p>Processing...</p>
        </div>
      ) : null}

      {/* "Next Question" button shown only when processing is complete */}
      {processing === 3 || processing === 4 ? (
        <button onClick={goToNextQuestion} style={styles.nextButton}>
          Next
        </button>
      ) : null}
    </div>
  );
};

export default ExamPage;

// Styles
const styles = {
  container: {
    textAlign: 'center' as const,
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  scoreBoard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  scoreText: {
    fontSize: '1.5rem',
    color: '#333',
  },
  progressText: {
    fontSize: '1.5rem',
    color: '#333',
  },
  progressContainer: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '20px',
    height: '20px',
    marginBottom: '20px',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: '20px',
  },
  captureContainer: {
    marginTop: '50px',
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px 30px',
    fontSize: '1.2rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  resultText: {
    fontSize: '2rem',
    color: '#333',
    marginTop: '20px',
  },
};