import React, { useState, useEffect } from 'react';

interface ASLInterpreterProps {
  photo1: string;
  photo2: string;
  setResult: React.Dispatch<React.SetStateAction<string>>; // Add the new prop for the state setter
}

const ASLInterpreter: React.FC<ASLInterpreterProps> = ({ photo1, photo2, setResult }) => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interpretASL = async () => {
      try {
        const response = await fetch('/api/chatgpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ photo1, photo2 }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`API Error: ${errorData.failedReason || response.statusText}`);
        }

        const result = await response.json();
        setAnswer(result.answer.word); // Access the specific property 'word'
        setResult(result.answer.word); // Set the external state using the new prop
      } catch (err: any) {
        setError(`Error: ${err.message}`);
      }
    };

    interpretASL();
  }, [photo1, photo2, setResult]);

  return (
    <div>
      <h2>ASL Interpreter</h2>
      {answer ? (
        <div>
          <h3>Interpreted Word:</h3>
          <p>{answer}</p>
        </div>
      ) : (
        <p>Processing...</p>
      )}
      {error && (
        <div>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ASLInterpreter;
