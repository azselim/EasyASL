'use client';

import React, { useState, useRef, useEffect } from 'react';
import ASLInterpreter from './GetASL';

// Define the prop type for `photoTaken` and `setProcessing`
interface CaptureAndProcessProps {
  photoTaken: boolean;
  setProcessing: React.Dispatch<React.SetStateAction<number>>;
  correctWord: string;
}

const CaptureAndProcess: React.FC<CaptureAndProcessProps> = ({ photoTaken, setProcessing, correctWord}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  const [processedImageUrl1, setProcessedImageUrl1] = useState<string>('');
  const [processedImageUrl2, setProcessedImageUrl2] = useState<string>('');
  const [word, setWord] = useState<string>('');
  const [once, setOnce] = useState(true);

  

  useEffect(() => {
    // Initialize webcam stream
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

  // Monitor changes in `photoTaken` and trigger capture process
  useEffect(() => {
    if (photoTaken) {
      captureAndProcessPhotos();
    }
  }, [photoTaken]); // Run when `photoTaken` changes

  // Effect to run custom code once both images are set
  useEffect(() => {
    if (processedImageUrl1 && processedImageUrl2) {
      setProcessing(1);
    }
  }, [processedImageUrl1, processedImageUrl2]); // Runs whenever either image URL changes

  const captureAndProcessPhotos = () => {
    if (!videoRef.current || !canvasRef1.current || !canvasRef2.current) return;
  
    const ctx1 = canvasRef1.current.getContext('2d');
    const ctx2 = canvasRef2.current.getContext('2d');
  
    if (!ctx1 || !ctx2) return;
  
    // Define the target dimensions for compressed images
    const targetWidth = 320; // Smaller width for compression
    const targetHeight = 240; // Smaller height for compression
  
    // Resize and capture the first photo
    canvasRef1.current.width = targetWidth;
    canvasRef1.current.height = targetHeight;
    ctx1.drawImage(videoRef.current, 0, 0, targetWidth, targetHeight); // Draw to smaller canvas
    const imageDataURL1 = canvasRef1.current.toDataURL('image/jpeg', 0.7); // Use JPEG format for further compression
  
    // Process the first image
    processImage(imageDataURL1)
      .then((url) => {
        setProcessedImageUrl1(url);
      })
      .catch((error) => {
        console.error('Error processing image 1:', error);
      });
  
    // Wait 1.5 seconds and then capture the second photo
    setTimeout(() => {
      canvasRef2.current.width = targetWidth;
      canvasRef2.current.height = targetHeight;
      ctx2.drawImage(videoRef.current!, 0, 0, targetWidth, targetHeight); // Draw to smaller canvas
      const imageDataURL2 = canvasRef2.current.toDataURL('image/jpeg', 0.7); // Compress second image
  
      // Process the second image
      processImage(imageDataURL2)
        .then((url) => {
          setProcessedImageUrl2(url);
        })
        .catch((error) => {
          console.error('Error processing image 2:', error);
        });
    }, 1000);
  };
  

  const processImage = async (base64Image: string): Promise<string> => {
    // Send the image to the API route
    const response = await fetch('/api/process-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
      <h2>Capture and Process Images</h2>
      <video ref={videoRef} width="640" height="480" autoPlay muted></video>
      <div style={{ display: 'none' }}>
        <canvas ref={canvasRef1} width="640" height="480"></canvas>
        <canvas ref={canvasRef2} width="640" height="480"></canvas>
      </div>
      {(processedImageUrl1 && processedImageUrl2 && once) && (
        <div>
          <h3>
            {/* Pass setProcessing and setWord to the ASLInterpreter component */}
            <ASLInterpreter
              photo1={processedImageUrl1}
              photo2={processedImageUrl2}
              setResult={(word) => {
                setWord(word); // Set the interpreted word
                if (word === correctWord) {
                  setProcessing(3); // If interpreted as correct
                } else {
                  setProcessing(2); // If interpreted as incorrect
                }
                setOnce(false);
              }}
            />
          </h3>
        </div>
      )}
    </div>
  );
};

export default CaptureAndProcess;
