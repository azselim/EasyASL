<<<<<<< HEAD
'use client'
'use client'
import Image from "next/image";
import React from "react";
import { Typewriter } from 'react-simple-typewriter';
import '../styles/globals.css'
import { Typewriter } from 'react-simple-typewriter';
import '../styles/globals.css'

const Home: React.FC = () => {
const Home: React.FC = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-20 row-start-2 items-center sm:items-start">
        
        {/* Centering the h1 with Typewriter effect */}
        <div className="w-full flex justify-center">
          <h1>
          VeriLang
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" , marginLeft: "500px"}}>
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={150}
            height={150}
            style={{ marginRight: "20px" }} // Space between image and text
          />
          <h2>
          <Typewriter
              words={['Learn', 'Translate', 'Practice']}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
            </h2>

            
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <a className="footer-button" href="/">Practice</a>
            <a className="footer-button" href="/translation-page">Translate</a>
            <a className="footer-button" href="/education-page">Learn</a>
          </footer>
            
        </div>
        <div style = {{display: "flex", alignItems: "center", marginLeft: "350px" }}>
        <div style = {{display: "flex", alignItems: "center", marginLeft: "350px" }}>
=======
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1><strong>VeriLang</strong></h1>
        {/*<TypingEffect />*/}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <Image
          src="/logo.jpg"
          alt="Logo"
          width={150}
          height={150}
          style={{ marginRight: '20px' }} // Space between image and text
        />
        <h2>American Sign Language (ASL)</h2>
      </div>
>>>>>>> parent of faa5504 (type-writer-effect)
        <Image
          className="logo"
          src="/coloredline.png"
          alt="Line"
          width={800}
          height={80}
        />
<<<<<<< HEAD
        
        </div>

        <div style={{marginTop: "100px", marginBottom: "100px"}}>
          {/* Placeholder for any future content */}
          
        
        </div>

        <div style={{marginTop: "100px", marginBottom: "100px"}}>
          {/* Placeholder for any future content */}
          
=======

        <div className="body_text">
          <a
        react-test
            href="./education-page/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
        react-test
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Practice ASL
          </a>
          </div>
          <div className="body_text">
          <a
        react-test
            href="./certification-page/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
        react-test
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Certify ASL Skills
          </a>
          </div>
          <div className="body_text">
          <a
        react-test
            href="./translation-page/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
        react-test
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Translate in Real-Time
          </a>
>>>>>>> parent of faa5504 (type-writer-effect)
          </div>
      </main>

      {/* Footer with buttons */}
      
 
      
      

      {/* Footer with buttons */}
      
 
      
      

    </div>
  );
<<<<<<< HEAD
};
};

export default Home;



=======
}
>>>>>>> parent of faa5504 (type-writer-effect)
