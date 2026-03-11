// pages/Services.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_URL from "../utils/api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setLoading(false);
      });
  }, []);

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
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>Loading services...</div>
        ) : services.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px" }}>No services available.</div>
        ) : (
          services.map((service, index) => (
            <React.Fragment key={service._id}>
              <div style={styles.serviceItem} className="service-hover">
                <h3 style={styles.serviceTitle}>{service.title}</h3>
                <p style={styles.serviceText}>{service.description}</p>
                {service.link.startsWith("http") ? (
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...styles.button, backgroundColor: service.buttonBgColor || "#413543" }}
                  >
                    {service.linkText}
                  </a>
                ) : (
                  <Link
                    to={service.link}
                    style={{ ...styles.button, backgroundColor: service.buttonBgColor || "#413543" }}
                  >
                    {service.linkText}
                  </Link>
                )}
              </div>
              {index < services.length - 1 && <hr style={styles.divider} />}
            </React.Fragment>
          ))
        )}
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