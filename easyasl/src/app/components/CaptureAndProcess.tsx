'use client';

import React, { useState, useRef, useEffect } from 'react';
import ASLInterpreter from './GetASL';

interface CaptureAndProcessProps {
  photoTaken: boolean;
  setProcessing: React.Dispatch<React.SetStateAction<number>>;
  correctWord: string;
  incrementScore: () => void;
  goToNextQuestion: () => void; // Add the next question prop
  processing: number
}

const CaptureAndProcess: React.FC<CaptureAndProcessProps> = ({
  photoTaken,
  setProcessing,
  correctWord,
  incrementScore,
  goToNextQuestion, // Include the next question prop
  processing,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  const [processedImageUrl1, setProcessedImageUrl1] = useState<string>('');
  const [processedImageUrl2, setProcessedImageUrl2] = useState<string>('');
  const [word, setWord] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('Error accessing the webcam:', err);
        });
    }
  }, []);

  useEffect(() => {
    if (photoTaken) {
      captureAndProcessPhotos();
    }
  }, [photoTaken]);

  useEffect(() => {
    if (processedImageUrl1 && processedImageUrl2) {
      setProcessing(1);
    }
  }, [processedImageUrl1, processedImageUrl2]);

  const captureAndProcessPhotos = () => {
    if (!videoRef.current || !canvasRef1.current || !canvasRef2.current) return;

    const ctx1 = canvasRef1.current.getContext('2d');
    const ctx2 = canvasRef2.current.getContext('2d');

    if (!ctx1 || !ctx2) return;

    canvasRef1.current.width = 320;
    canvasRef1.current.height = 240;
    ctx1.drawImage(videoRef.current, 0, 0, 320, 240);
    const imageDataURL1 = canvasRef1.current.toDataURL('image/jpeg', 0.7);

    processImage(imageDataURL1)
      .then((url) => setProcessedImageUrl1(url))
      .catch((error) => console.error('Error processing image 1:', error));

    setTimeout(() => {
      canvasRef2.current.width = 320;
      canvasRef2.current.height = 240;
      ctx2.drawImage(videoRef.current!, 0, 0, 320, 240);
      const imageDataURL2 = canvasRef2.current.toDataURL('image/jpeg', 0.7);

      processImage(imageDataURL2)
        .then((url) => setProcessedImageUrl2(url))
        .catch((error) => console.error('Error processing image 2:', error));
    }, 1500);
  };

  const processImage = async (base64Image: string): Promise<string> => {
    const response = await fetch('/api/process-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Image }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.message || response.statusText}`);
    }

    const result = await response.json();
    return result.processedImageUrl;
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay muted></video>
      <div style={{ display: 'none' }}>
        <canvas ref={canvasRef1} width="640" height="480"></canvas>
        <canvas ref={canvasRef2} width="640" height="480"></canvas>
      </div>
      {processedImageUrl1 && processedImageUrl2 && (
        <div>
          <h3>
            <ASLInterpreter
              photo1={processedImageUrl1}
              photo2={processedImageUrl2}
              setResult={(word) => {
                setWord(word);
                if (word === correctWord) {
                  incrementScore(); // Increment the score if the word is correct
                  setProcessing(3);
                } else {
                  setProcessing(4);
                }
              }}
            />
          </h3>
          {(word && (word === correctWord ? (
            <p>Correct! Click 'Next' to continue.</p>
          ) : (
            <p>Incorrect. The correct answer was {correctWord}. Click 'Next' to continue.</p>
          )))}
          {(processing === 3 || processing === 4) && (
            <button onClick={goToNextQuestion}>Next</button>
          )}
        </div>
      )}
    </div>
  );
};

export default CaptureAndProcess;
