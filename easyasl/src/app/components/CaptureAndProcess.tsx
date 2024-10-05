import React, { useState, useRef, useEffect } from 'react';

const CaptureAndProcess: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  const [processedImageUrl1, setProcessedImageUrl1] = useState<string>('');
  const [processedImageUrl2, setProcessedImageUrl2] = useState<string>('');

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      // Request access to the webcam
      navigator.mediaDevices.getUserMedia({ video: true })
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

  const captureAndProcessPhotos = () => {
    if (!videoRef.current || !canvasRef1.current || !canvasRef2.current) return;

    const ctx1 = canvasRef1.current.getContext('2d');
    const ctx2 = canvasRef2.current.getContext('2d');

    if (!ctx1 || !ctx2) return;

    // Capture the first photo
    ctx1.drawImage(videoRef.current, 0, 0, canvasRef1.current.width, canvasRef1.current.height);
    const imageDataURL1 = canvasRef1.current.toDataURL('image/png');

    // Process the first image
    processImage(imageDataURL1).then((url) => {
      setProcessedImageUrl1(url);
    }).catch((error) => {
      console.error('Error processing image 1:', error);
    });

    // Wait 1.5 seconds and then capture the second photo
    setTimeout(() => {
      ctx2.drawImage(videoRef.current!, 0, 0, canvasRef2.current.width, canvasRef2.current.height);
      const imageDataURL2 = canvasRef2.current.toDataURL('image/png');

      // Process the second image
      processImage(imageDataURL2).then((url) => {
        setProcessedImageUrl2(url);
      }).catch((error) => {
        console.error('Error processing image 2:', error);
      });
    }, 1500);
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
      <div>
        <button onClick={captureAndProcessPhotos}>Capture Photos</button>
      </div>
      <div style={{ display: 'none' }}>
        <canvas ref={canvasRef1} width="640" height="480"></canvas>
        <canvas ref={canvasRef2} width="640" height="480"></canvas>
      </div>
      {processedImageUrl1 && (
        <div>
          <h3>Processed Image 1:</h3>
          <img src={processedImageUrl1} alt="Processed Image 1" />
        </div>
      )}
      {processedImageUrl2 && (
        <div>
          <h3>Processed Image 2:</h3>
          <img src={processedImageUrl2} alt="Processed Image 2" />
        </div>
      )}
    </div>
  );
};

export default CaptureAndProcess;
