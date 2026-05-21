// StatsRow.jsx — Four stat cards displayed below the hero banner

const STAT_ICONS = {
  activities: (
    <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
      <circle cx="20" cy="20" r="20" fill="#E8F5E9" />
      <rect x="13" y="10" width="14" height="18" rx="2" fill="#4CAF50" />
      <line x1="16" y1="15" x2="24" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="18" x2="24" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="21" x2="21" y2="21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="25" cy="27" r="5" fill="#66BB6A" />
      <path d="M22.5 27l1.5 1.5 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  co2: (
    <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
      <circle cx="20" cy="20" r="20" fill="#E3F2FD" />
      <circle cx="20" cy="20" r="11" fill="#1E88E5" />
      <text x="20" y="22" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" fontFamily="sans-serif">CO₂</text>
    </svg>
  ),
  points: (
    <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
      <circle cx="20" cy="20" r="20" fill="#FFF8E1" />
      <circle cx="20" cy="20" r="11" fill="#FFA726" />
      <polygon points="20,13 22.5,18 28,18 23.5,21.5 25.5,27 20,23.5 14.5,27 16.5,21.5 12,18 17.5,18" fill="white" />
    </svg>
  ),
  streak: (
    <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
      <circle cx="20" cy="20" r="20" fill="#F3E5F5" />
      <circle cx="20" cy="20" r="11" fill="#9C27B0" />
      <path d="M20 13c0 0-5 4-5 8a5 5 0 0010 0c0-4-5-8-5-8z" fill="white" />
    </svg>
  ),
};

export default function StatsRow({ activitiesCount, co2Saved, pointsToday, streak }) {
  const stats = [
    { key: "activities", value: String(activitiesCount), label: "Activities Today", sub: "Keep it up! 🌿", subColor: "#4CAF50" },
    { key: "co2", value: `${co2Saved} kg`, label: "CO₂ Saved Today", sub: "Amazing! 🌍", subColor: "#1E88E5" },
    { key: "points", value: String(pointsToday), label: "Points Earned Today", sub: "Great going! ⭐", subColor: "#FFA726" },
    { key: "streak", value: String(streak), label: "Day Streak", sub: "On Fire! 🔥", subColor: "#9C27B0" },
  ];

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16,
    }}>
      <style>{`
        @keyframes cardIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .stat-card { animation: cardIn 0.4s ease both; transition: transform 0.2s, box-shadow 0.2s; }
        .stat-card:hover { transform: translateY(-4px) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.13) !important; }
      `}</style>
      {stats.map((s, i) => (
        <div key={s.key} className="stat-card" style={{
          background: "white", borderRadius: 16, padding: "18px 16px 12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          animationDelay: `${i * 0.08}s`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flexShrink: 0 }}>{STAT_ICONS[s.key]}</div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#1a1a1a", lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.3 }}>{s.label}</div>
            </div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, marginTop: 10, color: s.subColor }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}