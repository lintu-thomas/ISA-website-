import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [form, setForm] = useState({ date: "", issue: "", notes: "" });
  const [error, setError] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date || !form.issue) {
      setError("Date and Issue are required.");
      return;
    }
    
    try {
      await axios.post("http://localhost:5000/api/appointments", {
         date: new Date(form.date).toISOString(),
         issue: form.issue,
         notes: form.notes,
         studentName: user.name,
         studentRegNo: user.regNo,
         studentEmail: user.email
      });
      setError("");
      setShowSuccess(true);
      setForm({ date: "", issue: "", notes: "" });
    } catch (err) {
      setError("Failed to book appointment. Please try again later.");
      console.error(err);
    }
  };

  const handleLogout = () => {
    setShowLogout(false);
    localStorage.removeItem("user");
    navigate("/"); // Redirect to homepage
  };

  if (!user) return null;

  const getProfilePic = () => {
    let pic = user.profilePic;
    if (!pic) return "/faculty/matthew.jpeg";
    
    // If the path contains /faculty/, use it directly from frontend public
    if (typeof pic === 'string' && pic.includes('/faculty/')) {
      const parts = pic.split('/faculty/');
      return `/faculty/${parts[1]}`;
    }

    if (pic.startsWith("http")) return pic;
    return `http://localhost:5000/uploads${pic}`;
  };

  return (
    <section style={styles.wrapper}>
      {/* SUCCESS MODAL */}
      <div style={styles.container}>

        {/* LEFT PROFILE CARD */}
        <div style={styles.leftCard}>
          <img src={getProfilePic()} alt="Profile" style={styles.avatar} />
          <h2 style={styles.name}>{user.name}</h2>
          <p style={styles.info}>Reg No: {user.regNo}</p>
          <p style={styles.info}>Email: {user.email}</p>
          <button style={styles.logoutBtn} onClick={() => setShowLogout(true)}>
            Logout
          </button>
        </div>

        {/* RIGHT FORM CARD */}
        <div style={styles.rightCard}>
          <h2 style={styles.title}>Book an Appointment</h2>
          {error && <p style={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label>Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} />
            </div>

            <div style={styles.field}>
              <label>Issue</label>
              <select name="issue" value={form.issue} onChange={handleChange}>
                <option value="">Select an issue</option>
                <option>Visa</option>
                <option>Accommodation</option>
                <option>Academics</option>
                <option>Personal Support</option>
              </select>
            </div>

            <div style={styles.field}>
              <label>Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows="4" />
            </div>

            <button type="submit" style={styles.submitBtn}>Submit</button>
          </form>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h3>Appointment Confirmed</h3><br></br>
            <p>Your appointment has been booked successfully.</p>
            <button style={styles.modalBtn} onClick={() => setShowSuccess(false)}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div style={styles.modalActions}>
              <button style={styles.cancelBtn} onClick={() => setShowLogout(false)}>
                Cancel
              </button>
              <button style={styles.modalBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const styles = {
  wrapper: {
    minHeight: "90vh",
    background: "#f4f1e6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px"
  },
  container: {
    display: "flex",
    gap: "50px",
    width: "100%",
    maxWidth: "1100px",
    flexWrap: "wrap"
  },
  leftCard: {
    flex: "1",
    minWidth: "260px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
  },
  rightCard: {
    flex: "2",
    minWidth: "320px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
  },
  avatar: {
    width: "130px",
    borderRadius: "50%",
    marginBottom: "15px"
  },
  name: { marginBottom: "8px" },
  info: { margin: "4px 0", color: "#555" },
  logoutBtn: {
    marginTop: "15px",
    padding: "10px 22px",
    background: "#413543",
    color: "#F0E9D2",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer"
  },
  title: { marginBottom: "20px" },
  error: { color: "red", marginBottom: "10px" },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  submitBtn: {
    marginTop: "10px",
    padding: "12px",
    background: "#413543",
    color: "#F0E9D2",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "15px"
  },

  /* MODAL STYLES */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modalBox: {
    background: "#fff",
    padding: "30px 35px",
    borderRadius: "12px",
    textAlign: "center",
    width: "320px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },
  modalBtn: {
    marginTop: "15px",
    padding: "10px 0",
    width: "110px",
    background: "#413543",
    color: "#F0E9D2",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer"
  },
  cancelBtn: {
    marginTop: "15px",
    padding: "10px 0",
    width: "110px",
    background: "#ccc",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer"
  },
  modalActions: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  }
};