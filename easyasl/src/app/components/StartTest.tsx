import React, { useState } from 'react';
import CountdownTimer from '../components/Countdown';

// Child Component
const StartTest = ({ message, setPhotoTaken }: { message: string, setPhotoTaken: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(true); // Hide the button and show the new component
  };

  return (
    <div>
      {!showComponent ? (
        <button onClick={handleClick}>Click to show component</button>
      ) : (
        <div>
            <h4>Sign the word for</h4>
          <h2>{message}</h2> {/* Display the variable passed from the parent */}
          <CountdownTimer setPhotoTaken={setPhotoTaken}/>
        </div>
      )}
    </div>
  );
};

export default StartTest;