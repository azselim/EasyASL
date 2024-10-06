import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ setPhotoTaken }: { setPhotoTaken: React.Dispatch<React.SetStateAction<boolean>> }) => {
  // Initial time in seconds (1 hour)
  const initialTime = 2;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          //clearInterval(timerInterval);
          setPhotoTaken(true);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      {timeRemaining > 0 ? (
        <h1>{seconds}</h1>
      ) : (
        <h1>Sign!</h1>
      )}
    </div>
  );
};

export default CountdownTimer;