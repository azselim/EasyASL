'use client';

import { useEffect, useRef, useState } from 'react';

const CameraCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const captureInterval = useRef<NodeJS.Timeout | null>(null);

  // Function to start the webcam
  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing the webcam:', err);
      }
    };
    startVideo();

    // Cleanup: stop the video stream when the component is unmounted
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Function to capture photo and add to the photos array
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const base64String = canvasRef.current.toDataURL('image/jpeg');
        setPhotos(prevPhotos => [...prevPhotos, base64String]);
      }
    }
  };

  // Start capturing photos every 1.5 seconds
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        if (captureInterval.current) {
          clearInterval(captureInterval.current);
          captureInterval.current = null;
        }
      }
    };

    // Start capturing photos every 1.5 seconds
    captureInterval.current = setInterval(capturePhoto, 1500);

    // Listen for spacebar press to stop capturing
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (captureInterval.current) {
        clearInterval(captureInterval.current);
      }
    };
  }, []);

  return (
    <div>
      <h2>Camera Capture</h2>
      <video ref={videoRef} width="640" height="480" autoPlay />
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>

      <h3>Captured Photos</h3>
      <div>
        {photos.map((photo, index) => (
          <a key={index} href={photo} download={`photo${index + 1}.jpg`}>
            Download Photo {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CameraCapture;