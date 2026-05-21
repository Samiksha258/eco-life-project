// HeroBanner.jsx

export default function HeroBanner({ userName, bgGradient, bgLabel, bgEmoji, bgImage }) {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div style={{ padding: "20px 20px 0 20px" }}>
      <style>{`
        @keyframes heroFadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .hero-text { animation: heroFadeIn 0.5s ease both; }
      `}</style>

      <div style={{
        position: "relative",
        height: 420,
        borderRadius: 20,
        border: "3px solid #4ade80",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(74,222,128,0.25)",
        background: bgGradient || "#064e3b",
      }}>

        {/* Background image — contain so full image visible, no stretch */}
        {bgImage && (
          <img
            src={bgImage}
            alt={bgLabel}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%", height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        )}

        {/* Gradient overlay — only bottom portion for text, keeps image visible */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 45%, transparent 70%)",
        }} />

        {/* Scene label pill — top right */}
        <div style={{
          position: "absolute", top: 18, right: 18, zIndex: 2,
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)",
          borderRadius: 30, padding: "7px 16px",
          display: "flex", alignItems: "center", gap: 7,
          border: "1px solid rgba(255,255,255,0.2)",
        }}>
          <span style={{ fontSize: 18 }}>{bgEmoji}</span>
          <span style={{ color: "white", fontWeight: 700, fontSize: 13 }}>{bgLabel}</span>
        </div>

        {/* Greeting text — bottom left, above cards */}
        <div className="hero-text" style={{ position: "absolute", bottom: 30, left: 30, zIndex: 2 }}>
          <h1 style={{
            color: "white", fontSize: 30, fontWeight: 800, margin: 0,
            textShadow: "0 2px 14px rgba(0,0,0,0.7)",
            fontFamily: "'Nunito', sans-serif", lineHeight: 1.2,
          }}>
            {greeting}, <span style={{ color: "#86efac" }}>{userName}!</span> ☀️
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.9)", fontSize: 15,
            margin: "8px 0 0", fontWeight: 600,
            textShadow: "0 1px 8px rgba(0,0,0,0.6)",
          }}>
            Every small action creates a big change. 🌿
          </p>
        </div>

      </div>
    </div>
  );
}