import { useState } from "react  ";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("adminToken", data.token);
      nav("/admin/dashboard");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div style={{ height: "80vh", display: "grid", placeItems: "center" }}>
      <div style={{ padding: 30, width: 300, background: "#fff", borderRadius: 8 }}>
        <h3>Admin Login</h3>

        <input placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })} /><br /><br />

        <input type="password" placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })} /><br /><br />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
