// Toast.jsx — Animated notification popup

export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div style={{
      position: "fixed", top: 80, right: 24, zIndex: 999,
      background: "white", borderRadius: 16, padding: "14px 22px",
      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
      animation: "toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
      display: "flex", alignItems: "center", gap: 10,
      borderLeft: `4px solid ${toast.color || "#16a34a"}`,
      fontWeight: 700, fontSize: 15, fontFamily: "'Nunito', sans-serif",
      maxWidth: 320,
    }}>
      <style>{`@keyframes toastIn{from{transform:translateX(50px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
      <span style={{ fontSize: 24 }}>{toast.emoji}</span>
      <div>
        <div style={{ fontWeight: 800, color: "#1a1a1a" }}>{toast.title}</div>
        {toast.sub && <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, marginTop: 2 }}>{toast.sub}</div>}
      </div>
    </div>
  );
}