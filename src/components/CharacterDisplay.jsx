import { useState, useRef, useEffect } from "react";

const MOOD_EMOJI = {
  happy:    "😊",
  too_happy:"🤩",
  good_job: "👍",
  think:    "🤔",
  shock:    "😨",
  angry:    "😠",
};

const GEMINI_API_KEY = "AIzaSyDDOr1vPRGUgaPvaUfiXiju5Ra1KT36uOM"; // ← paste your AIza... key from aistudio.google.com

const SYSTEM_PROMPT = `You are Eco, a friendly AI eco-guide inside the EcoLife Tracker app.
Help users with eco-friendly tips, sustainability, green activities, climate facts, and how to earn points.
Keep responses SHORT (2-4 sentences), warm, friendly. Use emojis naturally.`;

async function askClaude(messages) {
  try {
    // Convert chat history to Gemini format
    const geminiMessages = messages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: geminiMessages,
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("Gemini error:", err);
      return "API error: " + (err.error?.message || "check your Gemini API key 🌿");
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, try again! 🌿";

  } catch (err) {
    console.error("Fetch error:", err);
    return "Network error. Check your connection 🌿";
  }
}

export default function CharacterDisplay({ mood = "happy", charImg = null, tip = "" }) {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hi! I'm Eco, your green guide! 🌿 Ask me anything about sustainability, eco tips, or how to earn more points!` }
  ]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef(null);
  const inputRef                = useRef(null);
  const emoji = MOOD_EMOJI[mood] || "😊";

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Only send last 10 messages to keep context window small
      const history = newMessages.slice(-10).map(m => ({ role: m.role, content: m.content }));
      const reply = await askClaude(history);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Oops! Something went wrong. Try again! 🌿" }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      <style>{`
        @keyframes charFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes chatPop { from{transform:scale(0.85) translateY(20px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
        @keyframes msgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .chat-window { animation: chatPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both; }
        .msg-bubble { animation: msgIn 0.25s ease both; }
        .send-btn:hover { background: #059669 !important; transform: scale(1.05); }
        .chat-input:focus { outline: none; border-color: #4ade80 !important; }
        .quick-btn:hover { background: #dcfce7 !important; border-color: #4ade80 !important; }
      `}</style>

      {/* ── CHAT WINDOW ── */}
      {isOpen && (
        <div className="chat-window" style={{
          position: "fixed", bottom: 100, right: 24, zIndex: 200,
          width: 340, height: 480,
          background: "white", borderRadius: 20,
          boxShadow: "0 12px 48px rgba(0,0,0,0.2)",
          border: "2px solid #d1fae5",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          fontFamily: "'Nunito', sans-serif",
        }}>

          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg,#064e3b,#16a34a)",
            padding: "14px 16px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              border: "2px solid #4ade80",
              background: "#C8E6C9", overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {charImg
                ? <img src={charImg} alt="Eco" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: 22 }}>{emoji}</span>
              }
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "white", fontWeight: 800, fontSize: 15 }}>Eco Guide 🌿</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80" }} />
                Always here to help
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{
              background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8,
              color: "white", cursor: "pointer", padding: "4px 8px", fontSize: 14, fontWeight: 700,
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "14px 14px 8px",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {messages.map((m, i) => (
              <div key={i} className="msg-bubble" style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                gap: 8, alignItems: "flex-end",
              }}>
                {/* Eco avatar for assistant */}
                {m.role === "assistant" && (
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: "#d1fae5", border: "1.5px solid #4ade80",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, overflow: "hidden",
                  }}>
                    {charImg
                      ? <img src={charImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <span>{emoji}</span>
                    }
                  </div>
                )}
                <div style={{
                  maxWidth: "75%",
                  background: m.role === "user"
                    ? "linear-gradient(135deg,#16a34a,#065f46)"
                    : "#f0fdf4",
                  color: m.role === "user" ? "white" : "#1e293b",
                  borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  padding: "10px 13px",
                  fontSize: 13, lineHeight: 1.55, fontWeight: 600,
                  border: m.role === "assistant" ? "1px solid #d1fae5" : "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                }}>
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="msg-bubble" style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", border: "1.5px solid #4ade80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>
                  {charImg ? <img src={charImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} /> : <span>{emoji}</span>}
                </div>
                <div style={{ background: "#f0fdf4", border: "1px solid #d1fae5", borderRadius: "18px 18px 18px 4px", padding: "10px 16px", display: "flex", gap: 4, alignItems: "center" }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", animation: `bounce 1s ease infinite`, animationDelay: `${i*0.2}s` }} />
                  ))}
                  <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div style={{ padding: "0 12px 8px", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["💧 Water saving tips","🌱 How to earn points","♻️ Recycling guide","🌍 Climate facts"].map(q => (
                <button key={q} className="quick-btn" onClick={() => { setInput(q); inputRef.current?.focus(); }} style={{
                  padding: "5px 10px", borderRadius: 20, border: "1px solid #d1fae5",
                  background: "#f0fdf4", fontSize: 11, fontWeight: 700, color: "#374151",
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                }}>{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: "10px 12px",
            borderTop: "1px solid #e2e8f0",
            display: "flex", gap: 8, alignItems: "flex-end",
            background: "#fafafa",
          }}>
            <textarea
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Eco anything... 🌿"
              rows={1}
              style={{
                flex: 1, border: "1.5px solid #d1fae5", borderRadius: 12,
                padding: "9px 12px", fontSize: 13, fontFamily: "inherit",
                resize: "none", background: "white", color: "#374151",
                fontWeight: 600, lineHeight: 1.4, maxHeight: 80, overflowY: "auto",
                transition: "border 0.2s",
              }}
            />
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={!input.trim() || loading}
              style={{
                width: 38, height: 38, borderRadius: 12, border: "none",
                background: input.trim() && !loading ? "#16a34a" : "#d1d5db",
                color: "white", cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0,
              }}
            >➤</button>
          </div>
        </div>
      )}

      {/* ── FLOATING CHARACTER BUTTON ── */}
      <div
        onClick={() => setIsOpen(o => !o)}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 200,
          width: 62, height: 62, borderRadius: "50%",
          border: "3px solid #4ade80",
          background: "#C8E6C9",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: isOpen
            ? "0 0 0 4px rgba(74,222,128,0.3), 0 6px 20px rgba(0,0,0,0.2)"
            : "0 4px 20px rgba(76,175,80,0.4)",
          cursor: "pointer", overflow: "hidden",
          animation: "charFloat 3s ease-in-out infinite",
          transition: "box-shadow 0.2s",
        }}
        title="Chat with Eco"
      >
        {charImg
          ? <img src={charImg} alt="Eco" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ fontSize: 32 }}>{emoji}</span>
        }

        {/* Unread dot when closed */}
        {!isOpen && (
          <div style={{
            position: "absolute", top: 2, right: 2,
            width: 14, height: 14, borderRadius: "50%",
            background: "#16a34a", border: "2px solid white",
          }} />
        )}
      </div>
    </>
  );
}