'use client'
import Image from "next/image";
import React from "react";
import { Typewriter } from 'react-simple-typewriter';
import '../styles/globals.css'

const Home: React.FC = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-20 row-start-2 items-center sm:items-start">
        
        {/* Centering the h1 with Typewriter effect */}
        <div style={{display: "flex", alignItems: "center", marginLeft: "470px"}}>
          <h1>
          EasyASL
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" , marginLeft: "420px"}}>
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

            
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <a className="footer-button" href="/trial-page">Learn</a>
            <a className="footer-button" href="/translation-page">Translate</a>
            <a className="footer-button" href="/capture">Certify</a>
          </footer>
            
        </div>
        <div style = {{display: "flex", alignItems: "center", marginLeft: "275px" }}>
        <Image
          className="logo"
          src="/coloredline.png"
          alt="Line"
          width={800}
          height={80}
        />
        
        </div>

        <div style={{marginTop: "100px", marginBottom: "100px"}}>
          {/* Placeholder for any future content */}
          
          </div>
      </main>

      {/* Footer with buttons */}
    </div>
  );
};

export default Home;

