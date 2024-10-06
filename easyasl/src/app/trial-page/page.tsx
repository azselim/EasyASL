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

  return (
    <div>
      <h1>Dictionary</h1>
      <p>Enter a word that you want to look up in the dictionary!</p>

      {/* Input textbox */}
      <input 
        type="text" 
        value={userInput} 
        onChange={handleInputChange} 
        placeholder="Enter your text here" 
      />
      
      {/* Display search result */}
      {isWordFound !== null && (
        <p>
          {isWordFound ? `The word "${userInput}" is in the list!` : `The word "${userInput}" is not in the list.`}
        </p>
      )}

      {/* Display the corresponding image if the word is found */}
      {foundImage && (
        <div>
          <h2>Corresponding Image:</h2>
          {/* Use standard <img> tag to display the image */}
          <img src={foundImage} alt={userInput} width={200} height={200} />
        </div>
      )}

      {/* Display the word list */}
      <h2>Word List</h2>
      <ul>
        {wordList.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>

      {/* Import and use the CameraCapture component */}
   
    </div>
  );
}