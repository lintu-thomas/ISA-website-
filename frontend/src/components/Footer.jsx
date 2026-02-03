// components/Footer.jsx
import React, { useState } from "react";
import { FaInstagram, FaEnvelope, FaPhone, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhones, setShowPhones] = useState(false);

  const handleEmailClick = () => {
    setShowEmail(!showEmail);
    setShowPhones(false); // Close phone card if open
  };

  const handlePhoneClick = () => {
    setShowPhones(!showPhones);
    setShowEmail(false); // Close email card if open
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ padding: "20px", background: "#413543", color: "#fff", textAlign: "center", position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
        <a href="https://www.instagram.com/sju.intsa" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
          <FaInstagram size={30} />
        </a>
        <FaEnvelope size={30} style={{ cursor: 'pointer', color: '#fff' }} onClick={handleEmailClick} />
        <FaPhone size={30} style={{ cursor: 'pointer', color: '#fff' }} onClick={handlePhoneClick} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', position: 'absolute', right: '20px', top: '20px' }} onClick={scrollToTop}>
        <FaArrowUp size={30} style={{ color: '#fff' }} />
        <span style={{ fontSize: '12px', marginTop: '5px' }}>to the top</span>
      </div>
      {showEmail && (
        <div style={{ background: '#fff', color: '#000', padding: '10px', borderRadius: '5px', marginTop: '10px', maxWidth: '400px', margin: '10px auto' }}>
          <p><strong>Email:</strong> pro@sju.edu.in</p>
        </div>
      )}
      {showPhones && (
        <div style={{ background: '#fff', color: '#000', padding: '10px', borderRadius: '5px', marginTop: '10px', maxWidth: '400px', margin: '10px auto' }}>
          <p><strong>Contact:</strong></p>
          <p>080 2227 4079</p>
          <p>080 2221 1429</p>
        </div>
      )}
      <p>St Joseph's University, 36, Lalbagh Road, Bengaluru-560027, Karnataka, India</p>
      <p>© 2026 ISA Website. All Rights Reserved.</p>
    </footer>
  );
}