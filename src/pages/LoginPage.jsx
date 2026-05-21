import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("login");
  const [hover, setHover] = useState(false);

  const icons = ["🌳","💧","☀️","🌱","♻️","🌍","🦋","🌿","🌾","🐝"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #166534 70%, #15803d 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');
        @keyframes floatIcon { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(8deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .eco-input:focus { border-color: #16a34a !important; background: white !important; }
        .login-card { animation: fadeUp 0.6s ease both; }
      `}</style>

      {/* Floating background icons */}
      {icons.map((e, i) => (
        <span key={i} style={{
          position: "absolute", fontSize: 28 + (i % 3) * 8,
          top: `${6 + (i * 9) % 85}%`, left: `${3 + (i * 10) % 92}%`,
          animation: `floatIcon ${2.5 + i * 0.35}s ease-in-out infinite`,
          animationDelay: `${i * 0.25}s`, opacity: 0.28, userSelect: "none",
        }}>{e}</span>
      ))}

      <div className="login-card" style={{
        background: "rgba(255,255,255,0.97)", borderRadius: 28, padding: "48px 44px",
        width: 420, boxShadow: "0 24px 64px rgba(0,0,0,0.28)", textAlign: "center",
        position: "relative", zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{ fontSize: 64, marginBottom: 6, display: "block", lineHeight: 1 }}>🌍</div>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 36, color: "#064e3b", marginBottom: 2 }}>EcoLife</div>
        <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 28, fontWeight: 600 }}>
          Track your planet-saving journey!
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24, background: "#f0fdf4", borderRadius: 14, padding: 6 }}>
          {["login", "signup"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px", borderRadius: 10, border: "none", cursor: "pointer",
              fontFamily: "inherit", fontWeight: 700, fontSize: 14,
              background: tab === t ? "#16a34a" : "transparent",
              color: tab === t ? "white" : "#374151", transition: "all 0.2s",
            }}>
              {t === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Inputs */}
        {tab === "signup" && (
          <div style={{ position: "relative", marginBottom: 14 }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🧑</span>
            <input className="eco-input" type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
              style={{ width: "100%", padding: "13px 14px 13px 42px", borderRadius: 12, border: "1.5px solid #d1fae5", fontSize: 15, fontFamily: "inherit", outline: "none", background: "#f0fdf4", boxSizing: "border-box", transition: "all 0.2s" }} />
          </div>
        )}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>👤</span>
          <input className="eco-input" type="text" placeholder="Username / Email"
            style={{ width: "100%", padding: "13px 14px 13px 42px", borderRadius: 12, border: "1.5px solid #d1fae5", fontSize: 15, fontFamily: "inherit", outline: "none", background: "#f0fdf4", boxSizing: "border-box", transition: "all 0.2s" }} />
        </div>
        <div style={{ position: "relative", marginBottom: 20 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔒</span>
          <input className="eco-input" type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)}
            style={{ width: "100%", padding: "13px 14px 13px 42px", borderRadius: 12, border: "1.5px solid #d1fae5", fontSize: 15, fontFamily: "inherit", outline: "none", background: "#f0fdf4", boxSizing: "border-box", transition: "all 0.2s" }} />
        </div>

        <button
          onClick={() => onLogin(name)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            width: "100%", padding: "16px", borderRadius: 14, border: "none", cursor: "pointer",
            fontFamily: "inherit", fontWeight: 800, fontSize: 17,
            background: "linear-gradient(135deg, #16a34a, #065f46)",
            color: "white", boxShadow: hover ? "0 10px 28px rgba(22,163,74,0.45)" : "0 6px 20px rgba(22,163,74,0.35)",
            transform: hover ? "translateY(-2px)" : "none", transition: "all 0.2s",
          }}>
          {tab === "login" ? "Enter EcoLife 🌍" : "Join the Movement 🌱"}
        </button>

        <div style={{ marginTop: 18, color: "#9ca3af", fontSize: 12, fontWeight: 600 }}>
          🔒 Safe &amp; secure &nbsp;·&nbsp; 🌱 No spam &nbsp;·&nbsp; 💚 Free forever
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "center" }}>
          {["🌍 Google", "🍎 Apple"].map(t => (
            <button key={t} onClick={() => onLogin("EcoWarrior")} style={{
              padding: "9px 18px", borderRadius: 10, border: "1.5px solid #d1d5db",
              background: "white", cursor: "pointer", fontSize: 13, fontWeight: 700,
              fontFamily: "inherit", transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}