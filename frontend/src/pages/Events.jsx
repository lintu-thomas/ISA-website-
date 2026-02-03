// pages/Events.jsx
import React, { useState } from "react";

const events = [
  { 
    title: "Elixir 2025", 
    desc: "A vibrant showcase portraying the traditions, food, music, and attire of different countries, celebrating cultural diversity and global unity.", 
    img: "/elixir.jpeg" 
  },
  { 
    title: "Investiture Ceremony", 
    desc: "A formal ceremony marking the induction of newly elected student leaders into their roles and responsibilities.", 
    img: "/investiture.jpeg" 
  },
  { 
    title: "Prathibha 2025", 
    desc: "Vintage Trails challenges students to explore and present their knowledge of world cultures, traditions, and heritage through creative expression.",
    img: "/g2.jpg" 
  },
  {
    title: "SJU X ASPIRE Talk",
    desc: "An inspiring talk session in collaboration with ASPIRE, focusing on career growth, innovation, and student opportunities.",
    img: "/sjuaspire.jpg"   
  }
];

export default function Events() {
  const [current, setCurrent] = useState(0);

  return (
    <section style={styles.wrapper}>
      <h1 style={styles.heading}>Events</h1>
      <div style={styles.underline}></div>


      <div style={styles.container}>
        <button 
          onClick={() => setCurrent((current - 1 + events.length) % events.length)} 
          style={styles.arrow}
        >
          ←
        </button>

        <div style={styles.card}>
          <img src={events[current].img} alt={events[current].title} style={styles.img} />
          <h2 style={styles.title}>{events[current].title}</h2>
          <p style={styles.desc}>{events[current].desc}</p>
        </div>

        <button 
          onClick={() => setCurrent((current + 1) % events.length)} 
          style={styles.arrow}
        >
          →
        </button>
      </div>
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
  fontSize: "18px",            // ⬅ larger description
  lineHeight: "1.8",
  color: "#555"
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
