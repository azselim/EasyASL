import React, { useState, useEffect } from 'react';

interface ASLInterpreterProps {
  photo1: string;
  photo2: string;
  setResult: React.Dispatch<React.SetStateAction<string>>; 
}

const ASLInterpreter: React.FC<ASLInterpreterProps> = ({ photo1, photo2, setResult }) => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasRun, setHasRun] = useState(false);

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
          console.log(errorData);
          throw new Error(`API Error: ${errorData.failedReason || response.statusText}`);
        }

        const result = await response.json();
        setAnswer(result.word);
        setResult(result.word);
      } catch (err: any) {
        setError(`Error: ${err.message}`);
      }
    };

    if (!hasRun && photo1 && photo2) {
      interpretASL();
      setHasRun(true);  // Only set this state change once after the function is called
    }
  }, [photo1, photo2]);  // Keep dependencies minimal

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
          <p>{error}, {answer}</p>
        </div>
      )}
    </div>
  );
};

export default ASLInterpreter;
