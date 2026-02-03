import React, { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

import logo1 from "../assets/logoisa1.png";
import logo2 from "../assets/logosju1.png";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{ 
        padding: "20px",
        background: "#413543",
        color: "#F0E9D2",
        position: "relative",
        fontFamily: "Georgia, serif"
      }}
    >
      {/* LEFT LOGOS + LINE */}
      <div
        style={{
          position: "absolute",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        <img src={logo1} alt="logo1" style={{ height: "70px" }} />

        <img src={logo2} alt="logo2" style={{ height: "70px" }} />

        {/* VERTICAL LINE */}
        <div
          style={{
            width: "2px",
            height: "46px",
            backgroundColor: "#F0E9D2",
            marginLeft: "6px"
          }}
        ></div>
      </div>

      {/* CENTER CONTENT */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ margin: "0", fontWeight: "normal" }}>
          INTERNATIONAL STUDENTS ASSOCIATION
        </h2>

        <p style={{ margin: "3px 0 0 0", fontSize: "12px" }}>
          St Joseph's University, 36, Lalbagh Road, Bengaluru-560027,
          Karnataka, India.
        </p>
      </div>

      {/* RIGHT SIDE – LOGIN + HAMBURGER */}
      <div
        style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}
      >
        {/* LOGIN BUTTON */}
        <Link
          to="/login"
          style={{
            background: "#F0E9D2",
            color: "#413543",
            padding: "8px 16px",
            borderRadius: "20px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Login
        </Link>

        {/* HAMBURGER ICON */}
        <div
          onClick={() => setOpen(true)}
          style={{
            fontSize: "28px",
            cursor: "pointer",
            userSelect: "none"
          }}
        >
          ☰
        </div>
      </div>

      {/* OVERLAY MENU */}
      {open && <HamburgerMenu close={() => setOpen(false)} />}
    </header>
  );
}
