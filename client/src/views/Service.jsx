// src/views/Service.jsx
import React from 'react';
import Navbar from '../components/Navbar'; // Import Navbar
import '../static/styles.css'; // Global styles

function Service() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Our Services</h1>
        <p>
          At Red Tail River Ranch, we offer a variety of services to make your stay unforgettable.
          From relaxing nature walks to horseback riding, there's something for everyone.
        </p>
        <ul>
          <li>Nature Walks</li>
          <li>Disc Golf</li>
          <li>Fishing</li>
          <li>Camping</li>
          <li>Photography Tours</li>
          <li>Music Camp Foundation</li>
          <li>Boy scouts</li>
          <li>Book Weddings</li>
        </ul>
      </div>
    </>
  );
}

export default Service;
