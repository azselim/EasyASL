// app/home/page.tsx
import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the Home Page of our basic Next.js project.</p>
      <Link href="/about">
        <button style={{ marginTop: '20px', padding: '10px 20px' }}>Go to About Page</button>
      </Link>
    </div>
  );
};

export default Home;
