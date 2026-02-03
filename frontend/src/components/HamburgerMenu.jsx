import { Link } from "react-router-dom";

export default function HamburgerMenu({ close }) {
  return (
    <>
      {/* BLUR BACKGROUND */}
      <div
        onClick={close}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(6px)",
          zIndex: 900
        }}
      />

      {/* SIDE MENU */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "320px",
          height: "100vh",
          background: "#413543",
          color: "#F0E9D2",
          display: "flex",
          flexDirection: "column",
          paddingTop: "80px",
          paddingLeft: "30px",
          boxShadow: "-5px 0 15px rgba(0,0,0,0.3)",
          zIndex: 1000,
          animation: "slideIn 0.3s ease"
        }}
      >
        {/* CLOSE */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 25,
            fontSize: 28,
            cursor: "pointer"
          }}
          onClick={close}
        >
          ✕
        </div>

        <Link onClick={close} to="/" className="menuItem">Home</Link>
        <Link onClick={close} to="/services" className="menuItem">Services</Link>
        <Link onClick={close} to="/quick-guide" className="menuItem">Quick Guide</Link>
        <Link onClick={close} to="/events" className="menuItem">Events</Link>
        <Link onClick={close} to="/gallery" className="menuItem">Gallery</Link>
        <Link onClick={close} to="/testimonials" className="menuItem">Testimonials</Link>
      </div>

      {/* PURE HOVER GLOW ONLY */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }

          .menuItem {
            color: #F0E9D2;
            font-size: 22px;
            margin: 12px 0;
            text-decoration: none;
            transition: all 0.25s ease;
          }

          /* ONLY ON TOUCH / HOVER */
          .menuItem:hover {
            text-shadow: 
              0 0 8px #F0E9D2,
              0 0 16px #F0E9D2,
              0 0 24px #F0E9D2;

            transform: scale(1.06);
          }
        `}
      </style>
    </>
  );
}
