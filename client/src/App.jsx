import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './views/Home';
import About from './views/About'; // Create this if you haven't
import Reservation from './views/Reservation'; // Create this if you haven't
import Service from './views/Service'; // Import the Service component
import Contact from './views/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          {/* Add more <Route> components here as needed */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
