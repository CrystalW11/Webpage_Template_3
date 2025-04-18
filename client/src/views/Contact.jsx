// src/views/Contact.jsx
import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import '../static/styles.css'; // Global styles (optional)

function Contact() {
  return (
    <>
      <Navbar /> {/* Navbar at the top */}
      <div className="page-container">
        <h1>Contact Us</h1>
        <p>
          We would love to hear from you! If you have any questions or need assistance, feel free to reach out.
        </p>
        
        <h2>Contact Information</h2>
        <p>
          <strong>Email:</strong> info@rtrranch.com <br />
          <strong>Phone:</strong> (555) 123-4567 <br />
          <strong>Address:</strong> 1234 Ranch Road, Red Tail River, USA
        </p>

        <h2>Contact Form</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="4" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </>
  );
}

export default Contact;
