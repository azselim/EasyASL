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
        <Image
          className="logo"
          src="/coloredline.png"
          alt="Line"
          width={800}
          height={80}
        />

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
          </div>
      </main>

      {/* Footer with buttons */}
      
 
      
      

      {/* Footer with buttons */}
      
 
      
      

    </div>
  );
}
