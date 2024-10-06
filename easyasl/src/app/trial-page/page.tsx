'use client'
import React, { useState } from 'react';
import CaptureAndProcess from '../components/CaptureAndProcess'; // Adjust the path based on your folder structure

export default function TrialPage() {
  const [userInput, setUserInput] = useState<string>(''); // State to handle user input
  const [isWordFound, setIsWordFound] = useState<boolean | null>(null); // State to handle search result
  const [foundImage, setFoundImage] = useState<string | null>(null); // State to handle the corresponding image

  // Array of words
  const wordList: string[] = ["bad", "bye", "good", "hello", "I", "more", "?", "thirsty", "want", "you"];

  // Image mapping
  const imageMap: { [key: string]: string } = {
    "bad": "/images/bad.jpg", // Ensure these images are placed inside /public/images folder
    "bye": "/images/bye.jpg",
    "good": "/images/good.jpg",
    "hello": "/images/hello.jpg",
    "I": "/images/I.jpg",
    "more": "/images/more.jpg",
    "?": "/images/question_mark.jpg",
    "thirsty": "/images/thirsty.jpg",
    "want": "/images/want.jpg",
    "you": "/images/you.jpg"
  };

  // Filter words based on user input
  const filteredWordList = wordList.filter(word =>
    word.toLowerCase().includes(userInput.toLowerCase())
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setUserInput(input);

    // Check if the input exists in the wordList
    if (wordList.includes(input)) {
      setIsWordFound(true);
      setFoundImage(imageMap[input]); // Set the corresponding image
    } else {
      setIsWordFound(false);
      setFoundImage(null); // Reset the image if word is not found
    }
  };

  const handleWordClick = (word: string) => {
    setUserInput(word);
    setIsWordFound(true);
    setFoundImage(imageMap[word]);
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Centered Title */}
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Dictionary</h1>
      <p style={{ marginBottom: '20px' }}>Type a word to look it up in the dictionary!</p>

      {/* Input textbox */}
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter your text here"
        style={{ padding: '10px', fontSize: '1rem', width: '80%', maxWidth: '400px', marginBottom: '20px' }}
      />

      {/* Dropdown suggestions */}
      {userInput && filteredWordList.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: '0', margin: '0', textAlign: 'left', width: '80%', maxWidth: '400px', marginInline: 'auto' }}>
          {filteredWordList.map((word, index) => (
            <li
              key={index}
              onClick={() => handleWordClick(word)}
              style={{ padding: '10px', cursor: 'pointer', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}
            >
              {word}
            </li>
          ))}
        </ul>
      )}

      {/* Display search result */}
      {isWordFound !== null && (
        <p>
          {isWordFound ? `The word "${userInput}" is in the list!` : `The word "${userInput}" is not in the list.`}
        </p>
      )}

      {/* Display the corresponding image if the word is found */}
      {foundImage && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '20px' }}>
          <h2>Corresponding Image:</h2>
          <img src={foundImage} alt={userInput} width={200} height={200} style={{ marginTop: '10px' }} />
        </div>
      )}

      {/* Display the word list */}
      <h2 style={{ marginTop: '30px' }}>Word List</h2>
      <ul style={{ listStyleType: 'none', padding: '0', fontSize: '1.2rem', lineHeight: '2rem', columnCount: 2, marginTop: '20px' }}>
        {wordList.map((word, index) => (
          <li key={index} style={{ padding: '5px 0' }}>{word}</li>
        ))}
      </ul>
    </div>
  );
}