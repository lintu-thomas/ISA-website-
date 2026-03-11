import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const backendUrl = "https://isa-backend-production.up.railway.app"; // Dev URL

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/gallery`);
        setImages(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const prev = () =>
    setIndex((index - 1 + images.length) % images.length);
  const next = () =>
    setIndex((index + 1) % images.length);

  const getPosition = (i) => {
    if (i === index) return "center";
    if (i === (index - 1 + images.length) % images.length) return "left";
    if (i === (index + 1) % images.length) return "right";
    return "hidden";
  };

  return (
    <section style={styles.section}>
      <h1 style={styles.heading}>Gallery</h1>
      <div style={styles.underline}></div>

      {loading ? (
        <div style={{ padding: "50px", fontSize: "18px", color: "#555" }}>Loading gallery...</div>
      ) : images.length === 0 ? (
        <div style={{ padding: "50px", fontSize: "18px", color: "#555" }}>No images uploaded yet.</div>
      ) : (
        <div style={styles.slider}>
          {images.map((imgObj, i) => {
            const position = getPosition(i);
            return (
              <img
                key={imgObj._id || i}
                src={`${backendUrl}${imgObj.imageUrl}`}
                alt={imgObj.title || `Gallery ${i}`}
                style={{
                  ...styles.image,
                  ...styles[position],
                }}
              />
            );
          })}

          <button onClick={prev} style={{ ...styles.arrow, left: "40px" }}>
            ❮
          </button>
          <button onClick={next} style={{ ...styles.arrow, right: "40px" }}>
            ❯
          </button>
        </div>
      )}
    </section>
  );
}

const styles = {
  section: {
    padding: "80px 20px",
    textAlign: "center",
    background: "#f4f1e6",
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
  slider: {
    position: "relative",
    height: "420px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    width: "60%",
    height: "380px",
    objectFit: "cover",
    borderRadius: "20px",
    transition: "all 0.5s ease",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
  },

  /* CENTER IMAGE */
  center: {
    transform: "translateX(0) scale(1)",
    zIndex: 3,
    opacity: 1,
  },

  /* LEFT IMAGE */
  left: {
    transform: "translateX(-60%) scale(0.85)",
    zIndex: 2,
    opacity: 0.6,
  },

  /* RIGHT IMAGE */
  right: {
    transform: "translateX(60%) scale(0.85)",
    zIndex: 2,
    opacity: 0.6,
  },

  /* HIDDEN OTHERS */
  hidden: {
    opacity: 0,
    transform: "scale(0.5)",
    zIndex: 0,
  },

  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "white",
    border: "none",
    fontSize: "28px",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    zIndex: 4,
  },
};
