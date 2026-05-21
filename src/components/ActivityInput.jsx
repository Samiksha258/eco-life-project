// ActivityInput.jsx — Log eco activity and trigger AI analysis

import { useState } from "react";

export default function ActivityInput({ onSubmit, isAnalyzing }) {
  const [text, setText] = useState("");

  const QUICK_TIPS = [
    "I watered plants with saved rainwater 💧",
    "Cycled to work instead of driving 🚲",
    "Turned off all lights before leaving 💡",
    "Planted a sapling in my garden 🌱",
    "Sorted and recycled household waste ♻️",
  ];

  function handleSubmit() {
    if (!text.trim() || isAnalyzing) return;
    onSubmit(text.trim());
    setText("");
  }

  return (
    <div style={{
      background: "white", borderRadius: 20,
      margin: "0 20px 20px", padding: "22px 24px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 20 }}>📝</span>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1B5E20", margin: 0 }}>
          Log Your Eco Activity
        </h2>
        {isAnalyzing && (
          <div style={{
            marginLeft: "auto", background: "#f0fdf4", borderRadius: 20,
            padding: "4px 12px", fontSize: 12, fontWeight: 700, color: "#16a34a",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⚙️</span>
            Analyzing...
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && e.ctrlKey && handleSubmit()}
        placeholder="Describe your eco-friendly activity today... e.g. 'I planted 2 saplings in the park and watered them with rainwater'"
        style={{
          width: "100%", height: 96, borderRadius: 14,
          border: "1.5px solid #d1fae5", padding: "12px 14px",
          fontSize: 14, fontFamily: "'Nunito', sans-serif", resize: "none",
          outline: "none", background: "#f8fffe", boxSizing: "border-box",
          lineHeight: 1.6, color: "#374151", transition: "border 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = "#16a34a"}
        onBlur={e => e.target.style.borderColor = "#d1fae5"}
      />

      {/* Quick pick tips */}
      <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
        {QUICK_TIPS.map((tip, i) => (
          <button key={i} onClick={() => setText(tip)} style={{
            padding: "5px 10px", borderRadius: 20,
            border: "1px solid #d1fae5", background: "#f0fdf4",
            fontSize: 11, fontWeight: 600, color: "#374151",
            cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.target.style.background = "#dcfce7"; e.target.style.borderColor = "#86efac"; }}
            onMouseLeave={e => { e.target.style.background = "#f0fdf4"; e.target.style.borderColor = "#d1fae5"; }}
          >{tip}</button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!text.trim() || isAnalyzing}
        style={{
          marginTop: 12, width: "100%", padding: "13px",
          borderRadius: 12, border: "none", cursor: text.trim() && !isAnalyzing ? "pointer" : "not-allowed",
          fontFamily: "inherit", fontWeight: 800, fontSize: 15,
          background: text.trim() && !isAnalyzing
            ? "linear-gradient(135deg, #16a34a, #065f46)"
            : "#d1d5db",
          color: "white", transition: "all 0.2s",
          boxShadow: text.trim() && !isAnalyzing ? "0 4px 16px rgba(22,163,74,0.3)" : "none",
        }}
      >
        {isAnalyzing ? "🤖 AI Analyzing your activity..." : "Submit & Earn Points 🌿"}
      </button>
      <div style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: 6, fontWeight: 600 }}>
        Ctrl + Enter to submit &nbsp;·&nbsp; AI will detect your scene and award points
      </div>
    </div>
  );
}