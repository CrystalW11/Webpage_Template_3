// src/views/About.jsx
import React from 'react';
import Navbar from '../components/Navbar'; // Keep Navbar consistent
import '../static/styles.css'; // Global styles

function About() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>About Red Tail River Ranch</h1>
        <p>
          Welcome to the About page! We are a peaceful escape in the heart of nature.
        </p>
      </div>
    </>
  );
}

export default About;
