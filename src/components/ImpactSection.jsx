// ImpactSection.jsx — Today's eco impact display

export default function ImpactSection({ log }) {
  // Compute impact from log
  const totalPts = log.reduce((s, a) => s + a.points, 0);
  const treeEquiv = Math.max(1, Math.floor(totalPts / 150));
  const kmNotDriven = Math.max(5, Math.floor(totalPts / 15));
  const waterBuckets = Math.max(5, Math.floor(totalPts / 20));
  const energyKwh = Math.max(2, Math.floor(totalPts / 25));
  const wasteKg = Math.max(0.5, (totalPts / 200).toFixed(1));

  const impacts = [
    { emoji: "🌳", value: String(treeEquiv), label: "Trees Planted", sub: "Equivalent Impact" },
    { emoji: "🚗", value: `${kmNotDriven} km`, label: "Not Driven", sub: "Less Emission" },
    { emoji: "🪣", value: String(waterBuckets), label: "Buckets of Water", sub: "Saved" },
    { emoji: "💡", value: `${energyKwh} kWh`, label: "Energy Saved", sub: "Equivalent Impact" },
    { emoji: "♻️", value: `${wasteKg} kg`, label: "Waste Recycled", sub: "Equivalent Impact" },
  ];

  return (
    <div style={{
      background: "white", borderRadius: 20,
      margin: "24px 20px", padding: "24px 24px 20px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <span style={{ fontSize: 22 }}>🌿</span>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1B5E20", margin: 0 }}>Today's Impact</h2>
      </div>

      {/* Impact grid */}
      <div style={{ display: "flex", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
        {impacts.map((item, i) => (
          <div key={i} style={{
            flex: "1 1 100px", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 4, padding: "8px 4px",
          }}>
            <div style={{ fontSize: 44, lineHeight: 1, marginBottom: 4 }}>{item.emoji}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a" }}>{item.value}</div>
            <div style={{ fontSize: 13, color: "#333", fontWeight: 600, textAlign: "center" }}>{item.label}</div>
            <div style={{ fontSize: 11, color: "#888", textAlign: "center" }}>{item.sub}</div>
          </div>
        ))}
      </div>

      {/* View report button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <button style={{
          border: "1.5px solid #4CAF50", borderRadius: 30, padding: "10px 28px",
          fontSize: 14, fontWeight: 700, color: "#2E7D32", background: "transparent",
          cursor: "pointer", letterSpacing: "0.3px",
          fontFamily: "'Nunito', sans-serif",
        }}>
          View Full Impact Report →
        </button>
      </div>
    </div>
  );
}