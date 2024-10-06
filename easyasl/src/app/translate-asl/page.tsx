'use client';

import React, { useState, useEffect } from 'react';
import TestPage from '@/app/components/Testwrdd';

const ParentPage: React.FC = () => {
  const [fullSentence, setFullSentence] = useState<string>(''); // Store the entire sentence
  const [currentWord, setCurrentWord] = useState<string>(''); // Store each individual word
  const [key, setKey] = useState<number>(0); // Unique key to reset `TestPage`
  const [finalized, setFinalized] = useState<boolean>(false); // Flag to indicate if the sentence is finalized
  const [correctedSentence, setCorrectedSentence] = useState<string>(''); // Store the corrected sentence

  // Function to handle each word received from `TestPage`
  const handleNewWord = (word: string) => {
    // Append the new word to the full sentence
    setFullSentence((prevSentence) => `${prevSentence} ${word}`.trim());
    setCurrentWord(word);
    resetTestPage(); // Reset TestPage after each word if not finalized
  };

  // Function to reset the `TestPage` component
  const resetTestPage = () => {
    if (!finalized) {
      setKey((prevKey) => prevKey + 1); // Increment the key to force a reset of `TestPage`
    }
  };

  // Function to handle spacebar press and finalize the sentence
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === ' ') {
      setFinalized(true); // Stop the process and show final sentence
    }
  };

  // Function to call the grammar correction API
  const correctSentence = async (sentence: string) => {
    try {
      const response = await fetch('/api/grammar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence }),
      });

      if (response.ok) {
        const data = await response.json();
        setCorrectedSentence(data.answer); // Update the sentence with the corrected one
      } else {
        console.error('Failed to correct sentence');
      }
    } catch (error) {
      console.error('Error correcting sentence:', error);
    }
  };

  // Attach the event listener for the spacebar press
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Call the grammar correction API when the sentence is finalized
  useEffect(() => {
    if (finalized) {
      correctSentence(fullSentence); // Correct the sentence
    }
  }, [finalized]);

  return (
    <div>
      <h1>ASL to English Translation</h1>
      <h2>Direct Translation: {fullSentence}</h2> {/* Display the entire sentence */}
      {!finalized && <h3>Current Word: {currentWord}</h3>} {/* Display the last received word only if not finalized */}
      
      {/* Render the TestPage with a unique key to reset it */}
      {!finalized && <TestPage key={key} onWordCaptured={handleNewWord} />}
      
      {/* Show final sentence when the process is finalized */}
      {finalized && (
        <div>
          <h2>Natural Translation: {correctedSentence}</h2>
        </div>
      )}
    </div>
  );
};

export default ParentPage;
