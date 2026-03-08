// pages/Testimonials.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("https://isa-backend.onrender.com/api/testimonials");
        setTestimonials(res.data);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

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

      {loading ? (
        <div style={styles.loadingState}>
          <p>Loading voices...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No testimonials available yet.</p>
        </div>
      ) : (
        <div style={styles.contentContainer}>
          {/* Video Testimonials */}
          {testimonials.filter(t => t.videoUrl).length > 0 && (
            <div style={styles.videoSection}>
              {testimonials.filter(t => t.videoUrl).map(testi => (
                <div key={testi._id} style={styles.singleVideoCard}>
                  <video controls style={styles.video}>
                    <source src={`https://isa-backend.onrender.com${testi.videoUrl}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          )}

          {/* Text Testimonials */}
          {testimonials.filter(t => !t.videoUrl).length > 0 && (
            <div style={styles.gridContainer}>
              {testimonials.filter(t => !t.videoUrl).map(testi => (
                <div key={testi._id} style={styles.card}>
                  <div style={styles.textOnlyWrapper}>
                     <p style={styles.quote}>"{testi.message}"</p>
                  </div>
                  <div style={styles.infoSection}>
                    <h3 style={styles.name}>{testi.name}</h3>
                    <p style={styles.role}>{testi.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

const styles = {
  page: {
    background: "#f4f1e6",
    paddingBottom: "80px",
    minHeight: "80vh"
  },
  headingContainer: {
    textAlign: "center",
    paddingTop: "60px",
    paddingBottom: "40px",
    paddingLeft: "20px",
    paddingRight: "20px"
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
  loadingState: {
    textAlign: "center",
    color: "#6b5c6f",
    fontSize: "18px",
    padding: "40px"
  },
  emptyState: {
    textAlign: "center",
    color: "#6b5c6f",
    fontSize: "18px",
    padding: "40px",
    background: "#fff",
    maxWidth: "500px",
    margin: "0 auto",
    borderRadius: "12px"
  },
  contentContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px"
  },
  videoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "50px",
    gap: "30px"
  },
  singleVideoCard: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#000",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    aspectRatio: "16/9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "30px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease",
  },
  textOnlyWrapper: {
    padding: "40px 30px",
    backgroundColor: "#4b3a52",
    flex: 1,
    display: "flex",
    alignItems: "center"
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },
  infoSection: {
    padding: "25px",
    borderTop: "1px solid #eee",
    backgroundColor: "#fff"
  },
  name: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#4b3a52",
    margin: "0 0 5px 0"
  },
  role: {
    fontSize: "14px",
    color: "#6b5c6f",
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: 0
  },
  quote: {
    fontSize: "16px",
    fontStyle: "italic",
    color: "#fff",
    lineHeight: "1.6",
    margin: 0
  },
  quoteSmall: {
    fontSize: "15px",
    fontStyle: "italic",
    color: "#6b5c6f",
    lineHeight: "1.5",
    marginBottom: "15px",
    marginTop: 0
  }
};