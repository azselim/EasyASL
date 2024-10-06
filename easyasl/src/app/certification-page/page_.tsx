//for education
import Image from "next/image";
import React from 'react';
import CaptureAndProcess from '../components/CaptureAndProcess'; // Adjust the path based on your folder structure
import StartTest from "../components/StartTest";
import TestWord from "../components/TestWord";

export default function certificationpage() {
  return (
    <div>
      <h1>Certification</h1>
      <p>This is the content of the education page.</p>
       {/* Import and use the CameraCapture component */}
       <TestWord/>
    </div>
  );
}