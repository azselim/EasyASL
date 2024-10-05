// app/capture/page.tsx
import React from 'react';
import CameraCapture from '@/app/components/CameraCapture'; // Adjust the import path if necessary

const CapturePage = () => {
  return (
    <div>
      <h1>Camera Capture Page</h1>
      <CameraCapture /> {/* Render the CameraCapture component here */}
    </div>
  );
};

export default CapturePage;
