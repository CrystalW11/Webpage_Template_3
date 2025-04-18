import React, { useEffect, useState } from 'react';
import '../static/slider.css'; // Define styles here

// Accept images as props
function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true); // Trigger fade-in
      }, 300); // Match the fade duration in CSS
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-container">
      <img
        src={images[currentIndex]}
        alt={`Slideshow ${currentIndex + 1}`}
        className={`slider-image ${fade ? 'fade-in' : 'fade-out'}`}
      />
    </div>
  );
}

export default ImageSlider;
