// pages/Services.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <section style={styles.container}>
      <header style={styles.header}>
        {/* Heading with underline */}
        <h1 style={styles.title}>
          SERVICES
          <span style={styles.underline}></span>
        </h1>
        <p style={styles.subtitle}></p>
      </header>

      <div style={styles.card}>
        {/* Magis Exchange Program */}
        <div style={styles.serviceItem} className="service-hover">
          <h3 style={styles.serviceTitle}>Magis Exchange Program</h3>
          <p style={styles.serviceText}>
            The Magis Exchange Program provides international students with
            opportunities to study abroad and engage in cultural exchange.
            Students can experience different academic environments and develop valuable cross-cultural skills.
            
          </p>
          <a
            href="https://www.sju.edu.in/magis-exchange-program"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...styles.button, backgroundColor: "#5C7AEA" }}
          >
            Learn More
          </a>
        </div>

        <hr style={styles.divider} />

        {/* Scholarships & Financial Aid */}
        <div style={styles.serviceItem} className="service-hover">
          <h3 style={styles.serviceTitle}>Scholarships & Financial Aid</h3>
          <p style={styles.serviceText}>
            Various scholarships and financial assistance programs are available
            to support international students during their academic journey.
            These programs aim to reduce financial barriers, reward academic
            excellence, and promote access to quality education. 
          </p>
          <Link
            to="/scholarships"
            style={{ ...styles.button, backgroundColor: "#413543" }}
          >
            View Scholarship Details
          </Link>
        </div>

        <hr style={styles.divider} />

        {/* Student Support Appointments */}
        <div style={styles.serviceItem} className="service-hover">
          <h3 style={styles.serviceTitle}>Student Support Appointments</h3>
          <p style={styles.serviceText}>
            Book a one-on-one appointment with the International Students Office
            for assistance related to visas, accommodation, academics, or personal concerns.
            Our staff provides personalized guidance and helps students navigate
            challenges during their time at the university. 
          </p>
          <Link
            to="/login"
            style={{ ...styles.button, backgroundColor: "#413543" }}
          >
            Book an Appointment
          </Link>
        </div>
      </div>

      {/* Inline styles for hover effects */}
      <style>
        {`
          .service-hover {
            transition: all 0.3s ease;
            padding: 20px;
            border-radius: 12px;
          }
          .service-hover:hover {
            background-color: #f4f4f8;
            box-shadow: 0 8px 20px rgba(0,0,0,0.12);
            transform: translateY(-3px);
          }
          a:hover, .button:hover {
            opacity: 0.9;
          }
        `}
      </style>
    </section>
  );
}

const styles = {
  container: { 
    minHeight: "80vh", 
    padding: "60px 20px", 
    background: "#f4f1e6",
  },
  header: { 
    textAlign: "center", 
    marginBottom: "40px" 
  },
  title: { 
    fontSize: "36px", 
    color: "#413543", 
    marginBottom: "10px", 
    fontFamily: "'Georgia', serif", 
    display: "inline-block", 
    position: "relative" 
  },
  underline: {
    display: "block",
    width: "60%",
    height: "4px",
    backgroundColor: "#413543",
    margin: "8px auto 0",
    borderRadius: "2px"
  },
  subtitle: { 
    fontSize: "18px", 
    color: "#6B7280" 
  },
  card: { 
    maxWidth: "900px", 
    margin: "0 auto", 
    backgroundColor: "#FFFFFF", 
    padding: "40px", 
    borderRadius: "12px", 
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)" 
  },
  serviceItem: { 
    marginBottom: "30px" 
  },
  serviceTitle: { 
    fontSize: "24px", 
    color: "#413543", 
    marginBottom: "12px" 
  },
  serviceText: { 
    fontSize: "17px", 
    lineHeight: "1.9", 
    color: "#374151", 
    marginBottom: "12px" 
  },
  divider: { 
    border: "none", 
    borderTop: "1px solid #E5E7EB", 
    margin: "30px 0" 
  },
  button: { 
    display: "inline-block", 
    marginTop: "10px", 
    padding: "12px 24px", 
    color: "#F0E9D2", 
    borderRadius: "25px", 
    textDecoration: "none", 
    fontWeight: "600", 
    transition: "all 0.3s ease", 
    cursor: "pointer" 
  }
};