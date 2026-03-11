// pages/Events.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const backendUrl = "https://isa-backend-production.up.railway.app"; // Dev URL

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/website-events`);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section style={styles.wrapper}>
      <h1 style={styles.heading}>Events</h1>
      <div style={styles.underline}></div>


      {loading ? (
        <div style={{ textAlign: "center", padding: "50px", fontSize: "18px", color: "#555" }}>
          Loading events...
        </div>
      ) : events.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px", fontSize: "18px", color: "#555" }}>
          No upcoming events at the moment.
        </div>
      ) : (
        <div style={styles.container}>
          <button
            onClick={() => setCurrent((current - 1 + events.length) % events.length)}
            style={styles.arrow}
          >
            ←
          </button>

          <div style={styles.card}>
            {events[current].imageUrl ? (
              <img src={`${backendUrl}${events[current].imageUrl}`} alt={events[current].title} style={styles.img} />
            ) : (
              <div style={styles.noImgBlock}>
                <span style={styles.noImgText}>{events[current].title}</span>
              </div>
            )}
            <h2 style={styles.title}>{events[current].title}</h2>

            <p style={styles.desc}>{events[current].description}</p>
          </div>

          <button
            onClick={() => setCurrent((current + 1) % events.length)}
            style={styles.arrow}
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}

const styles = {
  wrapper: {
    padding: "80px 20px",
    background: "#f4f1e6",
    textAlign: "center",
  },
  heading: {
    fontSize: "42px",
    fontWeight: "700",
    fontFamily: "'Georgia', serif",
    color: "#2c2c2c",
    letterSpacing: "2px",
    marginBottom: "10px",
    textTransform: "uppercase"
  },
  underline: {
    width: "80px",
    height: "4px",
    background: "#413543",
    margin: "0 auto 50px auto",
    borderRadius: "2px"
  },

  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "70px"   // more space for larger card
  },

  card: {
    textAlign: "center",
    width: "780px",              // ⬅ wider rectangle
    padding: "35px 40px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.12)"
  },

  img: {
    width: "100%",
    height: "300px",             // ⬅ shorter height = rectangle feel
    objectFit: "cover",
    borderRadius: "14px",
    marginBottom: "20px"
  },


  title: {
    marginBottom: "15px",
    fontSize: "30px",            // ⬅ bigger title
    color: "#2c2c2c"
  },

  desc: {
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#555",
    marginTop: "15px"
  },
  noImgBlock: {
    width: "100%",
    height: "300px",
    backgroundColor: "#413543",
    borderRadius: "14px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px)"
  },
  noImgText: {
    color: "#F0E9D2",
    fontSize: "24px",
    fontWeight: "bold",
    fontFamily: "'Georgia', serif",
    opacity: 0.8,
    padding: "0 20px"
  },
  arrow: {
    fontSize: "28px",
    background: "#413543",
    color: "#F0E9D2",
    border: "none",
    padding: "16px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)"
  }
};
