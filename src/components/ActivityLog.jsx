// ActivityLog.jsx — Scrollable recent activity feed

import { SCENE_IMAGES } from "../config/imageConfig";

const SCENE_EMOJI = {
  water_save: "💧", water_crisis: "🏜️", river_clean: "🏞️", river_dirty: "🌊",
  tree_plant: "🌳", tree_cut: "🪓", energy_save: "⚡", energy_crisis: "🔌",
  air_pollution: "🏭", positive: "🌍", thinking: "🤔",
};

export default function ActivityLog({ log }) {
  if (!log.length) return (
    <div style={{
      background: "white", borderRadius: 20, margin: "0 20px 20px",
      padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center",
    }}>
      <div style={{ fontSize: 48 }}>🌱</div>
      <div style={{ fontWeight: 700, color: "#6b7280", marginTop: 8 }}>
        No activities logged yet. Start your eco journey!
      </div>
    </div>
  );

  return (
    <div style={{
      background: "white", borderRadius: 20, margin: "0 20px 20px",
      padding: "22px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 20 }}>🌿</span>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1B5E20", margin: 0 }}>Recent Activities</h2>
        <span style={{
          marginLeft: "auto", background: "#f0fdf4", borderRadius: 20,
          padding: "3px 10px", fontSize: 12, fontWeight: 700, color: "#16a34a",
        }}>{log.length} logged</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {log.map((a, i) => {
          const scene = SCENE_IMAGES[a.scene] || SCENE_IMAGES.positive;
          const emoji = SCENE_EMOJI[a.scene] || "🌿";
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "#f8fafc", borderRadius: 14,
              padding: "12px 16px", border: "1px solid #e2e8f0",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#f0fdf4"}
              onMouseLeave={e => e.currentTarget.style.background = "#f8fafc"}
            >
              {/* Scene color dot + emoji */}
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: `${scene.accent}22`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22,
              }}>{emoji}</div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b", marginBottom: 2 }}>{a.text}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span>🏷 {a.category}</span>
                  <span>·</span>
                  <span>{a.time}</span>
                  {a.feedback && <><span>·</span><span style={{ color: "#16a34a" }}>{a.feedback}</span></>}
                </div>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{
                  color: a.isPositive !== false ? "#16a34a" : "#dc2626",
                  fontWeight: 900, fontSize: 18,
                }}>+{a.points}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>Eco Points</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}