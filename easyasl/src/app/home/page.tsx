'use client'
import Image from "next/image";
import React from "react";
import { Typewriter } from 'react-simple-typewriter';
import '../styles/globals.css'

const Home: React.FC = () => {
  return (
    <div style={{
      border: '2px solid #007BFF',  // Blue border around the entire page
      borderRadius: '10px',         // Optional: rounded corners
      padding: '20px',              // Inner padding around the border
      margin: '20px auto',          // Centering the container with margin
      maxWidth: '1200px',           // Set a max width for the page
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Optional: subtle shadow
      minHeight: '100vh',           // Ensures it takes up the full viewport height
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',     // Keeps content centered vertically
      alignItems: 'center',         // Centers horizontally
      position: 'relative',         // To help position buttons
    }}>

      {/* Centered Title and Typewriter effect */}
      <main className="flex flex-col items-center sm:items-start gap-20">
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <h1>EasyASL</h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: "20px", justifyContent: "center" }}>
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={150}
            height={150}
            style={{ marginRight: "20px" }} // Space between image and text
          />
          <h2>
            <Typewriter
              words={['Practice.', 'Translate.', 'Certify.']}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Image
            className="logo"
            src="/coloredline.png"
            alt="Line"
            width={800}
            height={80}
          />
        </div>

        <div style={{ marginTop: "100px", marginBottom: "100px", textAlign: 'center' }}>
          {/* Placeholder for any future content */}
        </div>
      </main>

      {/* Footer with buttons */}
      <footer className="flex gap-6 items-center justify-center" style={{
        position: 'absolute',
        bottom: '20px', // Position buttons fixed near the bottom
        left: '50%',
        transform: 'translateX(-50%)'
      }}>
        <a className="footer-button button-outline" href="/trial-page">Learn</a>
        <a className="footer-button button-outline" href="/translation-page">Translate</a>
        <a className="footer-button button-outline" href="/certification-page">Certify</a>
      </footer>

    </div>
  );
};

export default Home;