// pages/Testimonials.jsx
import React from "react";

export default function Testimonials() {
  return (
    <section style={styles.page}>

      {/* Heading */}
      <div style={styles.headingContainer}>
        <h1 style={styles.heading}>TESTIMONIALS</h1>
        <div style={styles.line}></div>
        <p style={styles.subText}>
          Voices from our International Student Community
        </p>
      </div>

      {/* Video */}
      <div style={styles.videoContainer}>
        <video controls width="700" style={styles.video}>
          <source src="/ISA.mp4" type="video/mp4" />
        </video>
      </div>

    </section>
  );
}

const styles = {
  page: {
    background: "#f4f1e6",
    paddingBottom: "80px"
  },
  headingContainer: {
    textAlign: "center",
    paddingTop: "60px",
    paddingBottom: "40px"
  },
  heading: {
    fontSize: "42px",
    fontWeight: "600",
    fontFamily: "'Georgia', serif",
    color: "#4b3a52",
    marginBottom: "10px",
    letterSpacing: "1px"
  },
  line: {
    width: "80px",
    height: "4px",
    backgroundColor: "#4b3a52",
    margin: "0 auto 15px"
  },
  subText: {
    fontSize: "18px",
    color: "#6b5c6f"
  },
  videoContainer: {
    display: "flex",
    justifyContent: "center"
  },
  video: {
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
  }
};