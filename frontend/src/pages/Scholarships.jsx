// pages/Scholarships.jsx
import React from "react";

export default function Scholarships() {
  return (
    <section style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>SCHOLARSHIPS</h1>
        <p style={styles.text}>
        The university offers merit-based and need-based scholarships for international students.
        These include merit grants, country-specific aid, and financial support programs designed
        to help students succeed academically and reduce financial barriers.
        </p><br></br>


        <a
          href="https://ssp.postmatric.karnataka.gov.in/homepage.aspx"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.button}
        >
          Apply for Scholarships
        </a>
      </div>
    </section>
  );
}

const styles = {
  
  wrapper: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f9fb",
    padding: "60px 20px"
  },
  card: {
    maxWidth: "700px",
    background: "#ffffff",
    padding: "50px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center"
  },
  heading: {
    fontSize: "36px",
    fontFamily: "'Georgia', serif",
    marginBottom: "20px",
    color: "#2c2c2c",
    letterSpacing: "1px"
  },
  text: {
  fontSize: "18px",
  lineHeight: "1.8",
  color: "#555",
  marginBottom: "10px",
  textAlign: "left"   // ⬅ left align paragraph
},

  button: {
    display: "inline-block",
    padding: "12px 24px",
    background: "#413543",
    color: "#F0E9D2",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)"
  }
};
