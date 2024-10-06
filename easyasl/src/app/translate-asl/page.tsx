'use client';

import React, { useState, useEffect } from 'react';
import TestPage from '@/app/components/Testwrdd';
import { useRouter } from 'next/navigation';

const ParentPage: React.FC = () => {
  const [fullSentence, setFullSentence] = useState<string>(''); // Store the entire sentence
  const [currentWord, setCurrentWord] = useState<string>(''); // Store each individual word
  const [key, setKey] = useState<number>(0); // Unique key to reset `TestPage`
  const [finalized, setFinalized] = useState<boolean>(false); // Flag to indicate if the sentence is finalized
  const [correctedSentence, setCorrectedSentence] = useState<string>(''); // Store the corrected sentence
  const router = useRouter();

  // Function to handle each word received from `TestPage`
  const handleNewWord = (word: string) => {
    if (!finalized) {
      setFullSentence((prevSentence) => `${prevSentence} ${word}`.trim());
      setCurrentWord(word);
      resetTestPage(); // Reset TestPage after each word if not finalized
    }
  };

  // Function to reset the `TestPage` component
  const resetTestPage = () => {
    setKey((prevKey) => prevKey + 1); // Increment the key to force a reset of `TestPage`
  };

  // Function to handle spacebar press and finalize the sentence
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === ' ' && !finalized) {
      setFinalized(true); // Stop the process and show the final sentence
    } else if (event.key === ' ' && finalized) {
      router.push('/translation-page'); // Redirect when space is pressed again after finalization
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

  // Attach the event listener for the spacebar press and clean it up properly
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [finalized]); // Include `finalized` to ensure proper state reference

  // Call the grammar correction API when the sentence is finalized
  useEffect(() => {
    if (finalized) {
      correctSentence(fullSentence); // Correct the sentence
    }
  }, [finalized, fullSentence]);

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
