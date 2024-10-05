// app/about/page.tsx
import Link from 'next/link';
import React from 'react';

const About = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>About Us</h1>
      <p>This is the About Page of our basic Next.js project.</p>
      <Link href="/home">
        <button style={{ marginTop: '20px', padding: '10px 20px' }}>Go back to Home Page</button>
      </Link>
    </div>
  );
};

export default About;
