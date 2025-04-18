import React, { useState, useEffect } from 'react';
import '../static/nav.css'; // Keep your custom styles if needed

function Navbar() {
  const [logoSize, setLogoSize] = useState(50); // Default size in px

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 480) {
        setLogoSize(35); // Small screen size, adjust logo size
      } else {
        setLogoSize(50); // Default size
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Ensure the size is adjusted on mount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#C3D3D7' }}>
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-logo" href="/">
          <img
            src="/RTR-Ranch_logo-FINAL_reverse.png"
            alt="RTR Logo"
            style={{ maxHeight: `${logoSize}px`, minHeight: '0.5in' }} // Dynamically adjust size
          />
        </a>

        {/* Navbar Links */}
        <div className="navbar-links">
          <a className="nav-link" href="/">Home</a>
          <a className="nav-link" href="/about">About</a>
          <a className="nav-link" href="/reservation">Reservation</a>
          <a className="nav-link" href="/service">Service</a>
          <a className="nav-link" href="/contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
