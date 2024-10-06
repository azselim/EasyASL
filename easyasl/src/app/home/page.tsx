'use client'
import Image from "next/image";
import React from "react";
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
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
        </div>
        <div style = {{display: "flex", alignItems: "center", marginLeft: "350px" }}>
        <Image
          className="logo"
          src="/coloredline.png"
          alt="Line"
          width={800}
          height={80}
        />
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* First Link */}
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="./education-page/"
            target="_blank"
            rel="noopener noreferrer"
            data-react-test="true"
            data-main="true"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Practice ASL
          </a>

          {/* Second Link */}
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="./certification-page/"
            target="_blank"
            rel="noopener noreferrer"
            data-react-test="true"
            data-main="true"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
              
            />
            Certify ASL Skills
          </a>

          {/* Third Link */}
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="./translation-page/"
            target="_blank"
            rel="noopener noreferrer"
            data-react-test="true"
            data-main="true"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Translate in Real-Time
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="mailto:verilang@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Contact Us
        </a>
      </footer>
    </div>
  );
};

export default Home;