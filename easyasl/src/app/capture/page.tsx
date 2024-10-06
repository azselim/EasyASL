// app/capture/page.tsx

'use client';

import React from 'react';
import CameraCapture from '@/app/components/CaptureAndProcess'; // Adjust the import path if necessary

const CapturePage = () => {
  return (
    <div>
      <h1>Camera Capture Page</h1>
      <CameraCapture /> {/* Render the CameraCapture component here */}
    </div>
  );
};

export default CapturePage;
