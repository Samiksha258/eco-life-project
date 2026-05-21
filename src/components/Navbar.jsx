// Navbar.jsx — Vertical sidebar

const NAV_LINKS = [
  { id: "home",        label: "Home",        icon: "🏠" },
  { id: "dashboard",   label: "Dashboard",   icon: "📊" },
  { id: "points",      label: "My Points",   icon: "⭐" },
  { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  { id: "settings",    label: "Settings",    icon: "⚙️" },
];

export default function Navbar({ totalPts, streak, page, setPage }) {
  return (
    <aside style={{
      width: 220,
      minHeight: "100vh",
      background: "linear-gradient(180deg, #064e3b 0%, #065f46 60%, #166534 100%)",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 0, left: 0, bottom: 0,
      zIndex: 100,
      boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@600;700;800&display=swap');
        .nav-link { transition: all 0.2s; border: none; cursor: pointer; font-family: 'Nunito', sans-serif; }
        .nav-link:hover { background: rgba(255,255,255,0.15) !important; transform: translateX(4px); }
      `}</style>

      {/* Logo */}
      <div style={{ padding: "28px 20px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.15)" />
            <path d="M16 8c-2 3-6 5-6 9a6 6 0 0012 0c0-4-4-6-6-9z" fill="#4ade80" />
            <path d="M16 10c1 2 4 4 4 7a4 4 0 01-8 0c0-3 3-5 4-7z" fill="#86efac" />
          </svg>
          <div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: "white", lineHeight: 1 }}>EcoLife</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Tracker</div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV_LINKS.map(n => (
          <button key={n.id} className="nav-link" onClick={() => setPage(n.id)} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 14px", borderRadius: 12, width: "100%", textAlign: "left",
            background: page === n.id ? "rgba(255,255,255,0.2)" : "transparent",
            color: "white", fontSize: 14, fontWeight: page === n.id ? 800 : 600,
            borderLeft: page === n.id ? "3px solid #4ade80" : "3px solid transparent",
          }}>
            <span style={{ fontSize: 18 }}>{n.icon}</span>
            <span>{n.label}</span>
            {page === n.id && (
              <div style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: "#4ade80" }} />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom: stats + avatar */}
      <div style={{ padding: "16px 14px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 12px", marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", fontWeight: 700, marginBottom: 2 }}>TOTAL POINTS</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 15 }}>⭐</span>
            <span style={{ fontWeight: 800, fontSize: 17, color: "white" }}>{totalPts.toLocaleString()}</span>
          </div>
        </div>
        <div style={{ background: "rgba(255,165,0,0.2)", borderRadius: 12, padding: "10px 12px", marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", fontWeight: 700, marginBottom: 2 }}>DAY STREAK</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 15 }}>🔥</span>
            <span style={{ fontWeight: 800, fontSize: 17, color: "white" }}>{streak} days</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#C8E6C9", border: "2px solid #4ade80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👤</div>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 13 }}>EcoWarrior</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Planet Pal · Lv.7</div>
          </div>
        </div>
      </div>
    </aside>
  );
}