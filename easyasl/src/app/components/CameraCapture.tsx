'use client';

import { useEffect, useRef, useState } from 'react';

const CameraCapture = () => {
  // Refs for video, canvas elements, and download links
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvas1Ref = useRef<HTMLCanvasElement | null>(null);
  const canvas2Ref = useRef<HTMLCanvasElement | null>(null);
  const downloadLink1Ref = useRef<HTMLAnchorElement | null>(null);
  const downloadLink2Ref = useRef<HTMLAnchorElement | null>(null);

  // State to store base64 strings for both images
  const [base64Image1, setBase64Image1] = useState<string>('');
  const [base64Image2, setBase64Image2] = useState<string>('');

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

  // Function to capture and save photos as Base64
  const captureAndSavePhotos = () => {
    if (videoRef.current && canvas1Ref.current && canvas2Ref.current) {
      const ctx1 = canvas1Ref.current.getContext('2d');
      const ctx2 = canvas2Ref.current.getContext('2d');

      // Check if both contexts are available
      if (ctx1 && ctx2) {
        // Capture first photo on canvas1
        ctx1.drawImage(videoRef.current, 0, 0, canvas1Ref.current.width, canvas1Ref.current.height);
        const base64String1 = canvas1Ref.current.toDataURL('image/jpeg');
        setBase64Image1(base64String1);
        if (downloadLink1Ref.current) {
          downloadLink1Ref.current.href = base64String1;
          downloadLink1Ref.current.click();
        }

        // Capture second photo after a 1.5s delay on canvas2
        setTimeout(() => {
          if (canvas2Ref.current) {
            ctx2.drawImage(videoRef.current!, 0, 0, canvas2Ref.current.width, canvas2Ref.current.height);
            const base64String2 = canvas2Ref.current.toDataURL('image/jpeg');
            setBase64Image2(base64String2);
            if (downloadLink2Ref.current) {
              downloadLink2Ref.current.href = base64String2;
              downloadLink2Ref.current.click();
            }
          }
        }, 1500);
      } else {
        console.error('Error: Canvas context is not available.');
      }
    }
  };

  // Function to stop the video stream
  const stopStreamedVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Keydown event listener
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 's') {
        captureAndSavePhotos();
      } else if (event.key.toLowerCase() === 'q') {
        stopStreamedVideo();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div>
      <h2>Press 's' to capture two photos with a 1.5s delay, convert them to Base64, or 'q' to stop the video.</h2>
      <video ref={videoRef} width="640" height="480" autoPlay />
      <canvas ref={canvas1Ref} width="640" height="480" style={{ display: 'none' }}></canvas>
      <canvas ref={canvas2Ref} width="640" height="480" style={{ display: 'none' }}></canvas>

      {/* Download links for the images */}
      <a ref={downloadLink1Ref} download="image1.jpg" style={{ display: 'none' }}>Download Image 1</a>
      <a ref={downloadLink2Ref} download="image2.jpg" style={{ display: 'none' }}>Download Image 2</a>

      {/* Display the Base64 strings */}
      <div id="output">
        {base64Image1 && (
          <>
            <p>First Image Base64:</p>
            <textarea rows={4} cols={80} value={base64Image1} readOnly />
          </>
        )}
        {base64Image2 && (
          <>
            <p>Second Image Base64:</p>
            <textarea rows={4} cols={80} value={base64Image2} readOnly />
          </>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;