// pages/QuickGuide.jsx
import React from "react";

export default function QuickGuide() {
  return (
    <section
      style={{
        padding: "60px 20px",
        textAlign: "center",
        fontFamily: "'Arial', sans-serif", // clean body font
      }}
    >
      {/* Heading with underline */}
      <h1
        style={{
          fontFamily: "'Georgia', serif", // classy heading font
          fontSize: "36px",
          color: "#413543",
          marginBottom: "10px",
          display: "inline-block",
          position: "relative",
        }}
      >
        QUICK QUIDE
        <span
          style={{
            display: "block",
            width: "60%",
            height: "4px",
            backgroundColor: "#413543",
            margin: "8px auto 0",
            borderRadius: "2px",
          }}
        ></span>
      </h1>

      <h3
        style={{
          fontSize: "20px",
          fontWeight: "400",
          marginBottom: "40px",
          color: "#6b5b5b",
        }}
      >
        Quick Map of the Campus
      </h3>

      {/* Map container */}
      <div
        style={{
          border: "2px solid #d1cfcf",
          borderRadius: "12px",
          padding: "10px",
          maxWidth: "700px",
          margin: "0 auto",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <iframe
          title="St. Joseph's University Bengaluru Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.573620325297!2d77.59567971515948!3d12.962641090255504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16770f0c6f0b%3A0x219a7b3c61eb2f16!2sSt.%20Joseph's%20University%2C%2036%20Lalbagh%20Rd%2C%20Shanthinagar%2C%20Bengaluru%2C%20Karnataka%20560027%2C%20India!5e0!3m2!1sen!2sin!4v1707170000000!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "10px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}