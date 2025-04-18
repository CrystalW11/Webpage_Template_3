import React, { useState, useEffect } from "react";
import "../static/nav.css";
import "../static/styles.css";
import Navbar from "../components/Navbar"; // Keep your navbar

import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';

const images = [image1, image2, image3, image4, image5];

function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <Navbar/>
    <div className="home-container">
    <h1>Welcome To <span style={{ color: '#E64725' }}>Red</span> Tail River Ranch!</h1>
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="slider-image"
      />
    </div>
    </>
  );
}

export default Home;
