'use client';

import React, { useState } from 'react';

// Define the structure of a certificate
interface Certificate {
  uid: string;
  name: string;
  dateGenerated: string;
  message: string;
}

const CertificatePage: React.FC = () => {
  const [name, setName] = useState(''); // State to store the user's name
  const [certificate, setCertificate] = useState<Certificate | null>(null); // State to store the generated certificate
  const [error, setError] = useState(''); // State to handle errors
  const [database, setDatabase] = useState<Certificate[]>([]); // State to hold all certificates in a "database"

  // Function to generate the certificate and add to the database
  const generateCertificate = () => {
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    // Generate a unique ID and get the current date
    const uid = 'ID-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const dateGenerated = new Date().toLocaleString();
    const message = `${name} has qualified for easyASL's basic certification!`;

    // Create a certificate object
    const newCertificate: Certificate = { uid, name, dateGenerated, message };

    // Update the state with the new certificate and add it to the database
    setCertificate(newCertificate);
    setDatabase((prevDatabase) => [...prevDatabase, newCertificate]); // Add to the "database"
    setError('');
  };

  // Function to download the certificate as a text file
  const downloadCertificate = () => {
    if (!certificate) return;

    const blob = new Blob([formatCertificate(certificate)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'easyASL_Certificate.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Function to format a single certificate
  const formatCertificate = (cert: Certificate) => {
    return `Certificate ID: ${cert.uid}\nName: ${cert.name}\nDate Generated: ${cert.dateGenerated}\n\n${cert.message}\n\n`;
  };

  // Function to download the entire database as a text file
  const downloadDatabase = () => {
    const allCertificates = database.map(formatCertificate).join('\n---\n');
    const blob = new Blob([allCertificates], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'easyASL_Database.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>easyASL Basic Certification</h1>
      {!certificate ? (
        <div>
          <p>Please enter your name to generate your certificate:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            style={{ fontSize: '16px', padding: '8px', width: '300px' }}
          />
          <br />
          <button
            onClick={generateCertificate}
            style={{ marginTop: '10px', fontSize: '16px', padding: '10px 20px' }}
          >
            Generate Certificate
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {database.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={downloadDatabase}
                style={{ marginTop: '10px', fontSize: '16px', padding: '10px 20px' }}
              >
                Download Certificate Database
              </button>
            </div>
          )}
        </div>
      ) : (
        <div id="certificate">
          <h2>Congratulations, {certificate.name}!</h2>
          <p>Your unique certificate ID is:</p>
          <h3>{certificate.uid}</h3>
          <p>Generated on: {certificate.dateGenerated}</p>
          <h3>{certificate.message}</h3>
          <button
            onClick={downloadCertificate}
            style={{ marginTop: '20px', fontSize: '16px', padding: '10px 20px' }}
          >
            Download Certificate
          </button>
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={downloadDatabase}
              style={{ marginTop: '10px', fontSize: '16px', padding: '10px 20px' }}
            >
              Download Certificate Database
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
//work
export default CertificatePage;