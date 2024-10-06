'use client';

import React, { useState, useEffect } from 'react';
import CameraCapture from '@/app/components/CaptureAndProcess';
import TestWord from '@/app/components/TestWord';

const CapturePage = () => {
  return (
    <div>
      <TestWord correctWord='want'/>
    </div>
  );
};

export default CapturePage;
