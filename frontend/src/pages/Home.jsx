import { useState, useEffect } from "react";
import Calendar from "./Calendar";

/* HERO IMAGES */
import ha1 from "../assets/ha1.png";
import ha2 from "../assets/ha2.png";
import ha3 from "../assets/ha3.png";
import ha4 from "../assets/ha4.png";
import ha5 from "../assets/ha5.png";

/* FACULTY IMAGES */
import christo from "../assets/faculty/christo.jpeg";
import venugopal from "../assets/faculty/venugopal.jpeg";

/* CORE COMMITTEE IMAGES */
import matthew from "../assets/faculty/matthew.jpeg";
import mabel from "../assets/faculty/mabel.jpeg";
import hanan from "../assets/faculty/hanan.jpeg";
import chaitali from "../assets/faculty/chaitali.jpeg";
import tenzin from "../assets/faculty/tenzin.jpeg";
import lintu from "../assets/faculty/lintu.jpeg";
import thang from "../assets/faculty/thang.jpeg";
import joshua from "../assets/faculty/joshua.jpeg";
import sumaya from "../assets/faculty/sumaya.jpeg";
import javiriya from "../assets/faculty/javiriya.jpeg";
import justin from "../assets/faculty/justin.jpeg";
import meinar from "../assets/faculty/meinar.jpeg";
import ashlyn from "../assets/faculty/ashlyn.jpeg";
import shravan from "../assets/faculty/shravan.jpeg";
import anan from "../assets/faculty/anan.jpeg";

export default function Home() {
  /* IMAGE SLIDER */
  const images = [ha1, ha2, ha3, ha4, ha5];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  /* NEWS */
  const news = [
    { title: "Boston University Visit", date: "17 Feb 2025" },
    { title: "Talk on Leadership by Geshe Lodoe Sangpo", date: "12 Jan 2025" },
    { title: "Rev. Dr Ambrose Pinto, S.J. Memorial Lecture", date: "8 Jan 2025" },
  ];

  /* CALENDAR */
  const calendar = [
    ["", "", "1", "2", "3", "4", "5"],
    ["6", "7", "8", "9", "10", "11", "12"],
    ["13", "14", "15", "16", "17", "18", "19"],
    ["20", "21", "22", "23", "24", "25", "26"],
    ["27", "28", "", "", "", "", ""],
  ];

  const marked = {
    8: "Memorial Lecture – SJU",
    12: "Leadership Talk – SJU",
    17: "Boston University Visit",
    21: "World Religion Day",
    22: "Mother Language Day",
    24: "International Education Day",
    26: "Republic Day – India",
    27: "Holocaust Remembrance",
    28: "Data Privacy Day",
    30: "World Leprosy Day",
    15: "Global Culture Exchange",
    20: "Social Justice Day",
  };

  /* FACULTY */
  const faculty = [
    { name: "Christo Selvan", role: "Director", img: christo },
    { name: "Mr Venugopal Padavu", role: "Associate Director", img: venugopal },
  ];

  /* CORE COMMITTEE */
  const coreCommittee = [
    { name: "Matthew Behanan Cherian", role: "President", img: matthew },
    { name: "Mabel Emilie Viegas", role: "Vice President", img: mabel },
    { name: "Hanan Salim", role: "General Secretary", img: hanan },
    { name: "Chaitali Agrawal", role: "Joint Secretary", img: chaitali },
    { name: "Tenzin Cheonyi", role: "Cultural Secretary", img: tenzin },
    { name: "Lintu Thomas", role: "Treasurer", img: lintu },
    { name: "Thangneichan Haokip", role: "PR Head", img: thang },
    { name: "Joshua Maimbo Muleya", role: "Event Head", img: joshua },
    { name: "Sumaya Muhammed", role: "Event Head", img: sumaya },
    { name: "Javiriya Qureshi", role: "Head of Media", img: javiriya },
    { name: "Justin Caye D. Cambas", role: "Documentation Head", img: justin },
    { name: "Meinar Efel Nahak", role: "Newsletter Head", img: meinar },
    { name: "Ashlyn Ruth Cutinha", role: "Social Media Head", img: ashlyn },
    { name: "Shravan Kumar", role: "External Advisor (Kannada)", img: shravan },
    { name: "Anan Zahra K S", role: "External Financial Advisor", img: anan },
  ];

  return (
    <div style={{ fontFamily: "Times New Roman" }}>
      {/* HERO */}
      <section style={heroSection}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            style={{
              width: "100%",
              height: "540px",
              objectFit: "cover",
              position: "absolute",
              transition: "opacity 1.6s ease-in-out",
              opacity: current === i ? 1 : 0,
            }}
          />
        ))}
        <div style={overlayStyle}>
          <h1 style={{ fontFamily: "Georgia" }}>
            Welcome to International Students Association
          </h1>
          <p style={{ letterSpacing: "1px" }}>St Joseph’s University, Bengaluru</p>
        </div>
        <button onClick={prevSlide} style={arrow("left")}>❮</button>
        <button onClick={nextSlide} style={arrow("right")}>❯</button>
      </section>

      {/* ABOUT */}
      <section style={aboutSection}>
        <h2 style={aboutHeading}>About Us</h2>
        <p>
          Founded in 1882, St Joseph’s University, Bengaluru is one of India’s oldest and most prestigious institutions
          of higher education. Administered by the Society of Jesus (Jesuits), a worldwide organization renowned for academic excellence and character formation, the University upholds a legacy of holistic education rooted in values, innovation, and social responsibility.
        </p>
        <p style={{ marginTop: "10px" }}>
          Elevated to University status on 2nd July 2022 under the Government of Karnataka’s R.U.S.A. scheme,
          St Joseph’s University holds the unique distinction of being India’s first Public-Private Partnership (PPP) University.
          The institution is committed to providing world-class, affordable education to students of all nationalities, irrespective of caste,
          creed, or economic background.
        </p>
        <p style={{ marginTop: "10px" }}>
          With state-of-the-art infrastructure, vibrant campus life, and a dedicated Office for International Affairs, the University fosters global collaborations, student exchanges, research partnerships, and multicultural engagement.
        </p>
      </section>

      {/* VISION & MISSION */}
      <section style={vmContainer}>
        <div style={vmCard}>
          <h3 style={vmTitle}>Vision</h3>
          <p>
            To form men and women for and with others, who through holistic
            education, strive for a just, secular, democratic, and ecologically
            sensitive society which empowers the poor, the oppressed and the
            marginalized.
          </p>
        </div>
        <div style={vmCard}>
          <h3 style={vmTitle}>Mission</h3>
          <p>
            In keeping with Jesuit heritage, the University aims at an integral
            formation of our staff and students, to be men and women who will be
            agents of societal change, by enabling them to attain academic and
            human excellence in a teaching-learning environment that fosters
            intellectual curiosity, ceaseless enquiry, personal integrity, social
            commitment, creativity, critical thinking, and innovation.
          </p>
        </div>
      </section>

      {/* NEWS & CALENDAR */}
      <section style={splitContainer}>
        <div style={half}>
          <h3 style={sectionTitle}>Latest News</h3>
          {news.map((n, i) => (
            <div key={i} style={newsCard}>
              <b>{n.title}</b>
              <div style={{ fontSize: "13px", color: "#555" }}>{n.date}</div>
            </div>
          ))}
        </div>
        <div style={half}>
          <h3 style={sectionTitle}>INTERNATIONAL & UNIVERSITY EVENTS CALENDER </h3>

          <div>
            <Calendar />
          </div>
        </div>
      </section>
      {/* FACULTY */}
      <section style={membersSection}> <h3 style={sectionTitle}>Faculty</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center", // centers cards horizontally
            gap: "50px",              // space between cards
          }}
        >
          {faculty.map((m, i) => (
            <div
              key={i}
              style={{
                width: "200px",
                height: "auto",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                background: "#fff",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#f0f0f0",
                }}
              >
                <img
                  src={m.img}
                  alt={m.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div style={{ padding: "10px", textAlign: "center" }}>
                <b>{m.name}</b>
                <p style={{ fontSize: "13px", marginTop: "4px", color: "#555" }}>
                  {m.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* CORE COMMITTEE */}
      <section style={membersSection}>
        <h3 style={sectionTitle}>Core Committee</h3>
        <div style={membersGrid}>
          {coreCommittee.map((m, i) => (
            <div key={i} style={memberCard}>
              <img
                src={m.img}
                alt={m.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  objectPosition: "center top", // <-- face stays visible
                  borderRadius: "8px 8px 0 0",
                }}
              />
              <div style={memberInfo}>
                <b>{m.name}</b>
                <p style={{ fontSize: "13px", marginTop: "4px", color: "#555" }}>{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* STYLES */
const heroSection = { width: "100%", height: "540px", position: "relative" };
const overlayStyle = {
  position: "absolute",
  bottom: "50px",
  left: "50px",
  background: "rgba(0,0,0,0.65)",
  color: "#F0E9D2",
  padding: "25px",
  borderRadius: "10px",
};
const aboutSection = {
  padding: "60px 10%",
  background: "#F0E9D2",
  color: "#413543",
  lineHeight: "1.9",
};
const aboutHeading = {
  borderLeft: "6px solid #1A2A6C",
  paddingLeft: "12px",
  fontSize: "28px",
  fontFamily: "Georgia",
};
const vmContainer = { display: "flex", gap: "25px", padding: "40px 8%", background: "#fff" };
const vmCard = { flex: 1, background: "#F9F9FF", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" };
const vmTitle = { color: "#1A2A6C", fontFamily: "Georgia" };
const splitContainer = { display: "flex", padding: "40px 8%", gap: "30px" };
const half = { flex: 1 };
const sectionTitle = { fontFamily: "Georgia", marginBottom: "15px", borderBottom: "2px solid #1A2A6C", paddingBottom: "6px" };
const newsCard = { background: "#F7F7F7", padding: "12px", marginBottom: "10px", borderRadius: "6px" };
const calendarGrid = { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" };
const dayBox = { background: "#FAFAFF", padding: "10px", minHeight: "80px", borderRadius: "8px", fontSize: "13px", border: "1px solid #E0E0FF" };
const eventTag = { background: "#413543", color: "#F0E9D2", fontSize: "11px", padding: "3px 5px", borderRadius: "6px", marginTop: "4px", boxShadow: "0 0 4px rgba(0,0,0,0.2)" };
function arrow(side) { return { position: "absolute", top: "50%", [side]: "20px", background: "rgba(0,0,0,0.5)", color: "white", border: "none", padding: "10px 16px", borderRadius: "50%", cursor: "pointer" }; }

/* MEMBERS STYLES */
const membersSection = { padding: "40px 8%", background: "#F9F9FF", marginTop: "30px" };
const membersGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", marginTop: "20px" };
const memberCard = { background: "#fff", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.08)", overflow: "hidden", textAlign: "center" };
const memberInfo = { padding: "10px 8px" };