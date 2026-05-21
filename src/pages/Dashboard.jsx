import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import StatsRow from "../components/StatsRow";
import ActivityInput from "../components/ActivityInput";
import ActivityLog from "../components/ActivityLog";
import CharacterDisplay from "../components/CharacterDisplay";
import Toast from "../components/Toast";
import { SCENE_IMAGES, DEFAULT_SCENE } from "../config/imageConfig";
import { analyzeActivity } from "../services/claudeService";

// ── Static data ──
const LEADERBOARD = [
  { name: "Aria S.",   pts: 4820, streak: 32, badge: "🌍", level: "Eco Hero" },
  { name: "Rohan M.", pts: 4210, streak: 28, badge: "🌱", level: "Green Star" },
  { name: "You",       pts: 3150, streak: 14, badge: "♻️", level: "Planet Pal", isYou: true },
  { name: "Lena K.",  pts: 2990, streak: 12, badge: "☀️", level: "Planet Pal" },
  { name: "Dev P.",   pts: 2330, streak:  9, badge: "🚲", level: "Eco Sprout" },
  { name: "Sofia R.", pts: 1870, streak:  7, badge: "💧", level: "Eco Sprout" },
];
const BADGES_EARNED = ["💧","🌱","♻️","☀️","🚲","🥦","🌍","⚡"];
const WEEK_DATA = [320, 510, 280, 670, 440, 780, 540];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const INITIAL_LOG = [
  { text: "Cycled to school instead of taking a car",  points: 120, scene: "positive",    category: "Green Transport",     feedback: "Zero emissions journey!",      isPositive: true, time: "Today 8:20 AM" },
  { text: "Fixed a dripping faucet at home",           points:  90, scene: "water_save",  category: "Water Conservation",  feedback: "Every drop saved matters!",    isPositive: true, time: "Yesterday 6:00 PM" },
  { text: "Planted 2 saplings in the community park",  points: 200, scene: "tree_plant",  category: "Tree Planting",       feedback: "Future forests start with you!", isPositive: true, time: "2 days ago" },
];

// ─────────────────────────────────────────────
// DASHBOARD PAGE
// ─────────────────────────────────────────────
function DashboardPage({ log, totalPts, streak }) {
  const maxPts = Math.max(...WEEK_DATA);
  const sceneCounts = {};
  log.forEach(a => { sceneCounts[a.scene] = (sceneCounts[a.scene] || 0) + 1; });

  const breakdown = [
    { emoji:"💧", label:"Water",    pct: 65, color:"#0ea5e9" },
    { emoji:"🌳", label:"Trees",    pct: 48, color:"#16a34a" },
    { emoji:"♻️", label:"Recycle",  pct: 35, color:"#0f766e" },
    { emoji:"⚡", label:"Energy",   pct: 28, color:"#f59e0b" },
    { emoji:"🚲", label:"Transport",pct: 20, color:"#7c3aed" },
  ];

  return (
    <div style={{ padding:"28px 32px", background:"#f0fdf4", minHeight:"calc(100vh - 120px)" }}>
      <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:28, color:"#064e3b", marginBottom:4 }}>📊 My Eco Dashboard</div>
      <div style={{ color:"#6b7280", fontSize:14, marginBottom:24, fontWeight:600 }}>Track your journey to a sustainable lifestyle</div>

      {/* Stat row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {[
          ["⭐ Total Points", totalPts.toLocaleString(), "#16a34a"],
          ["🔥 Day Streak",   `${streak} days`,          "#f59e0b"],
          ["🌱 Activities",   log.length,                 "#0ea5e9"],
          ["🏆 Rank",         "#3 Global",               "#7c3aed"],
        ].map(([l,v,c]) => (
          <div key={l} style={{ background:"white", borderRadius:20, padding:"20px", textAlign:"center", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #d1fae5" }}>
            <div style={{ fontSize:13, color:"#6b7280", fontWeight:700, marginBottom:6 }}>{l}</div>
            <div style={{ fontSize:32, fontWeight:900, color:c }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* Weekly chart */}
        <div style={{ background:"white", borderRadius:20, padding:"22px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #d1fae5" }}>
          <div style={{ fontWeight:800, color:"#064e3b", marginBottom:16 }}>📈 This Week's Eco Points</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:140 }}>
            {WEEK_DATA.map((v,i) => (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <div style={{ fontSize:10, fontWeight:700, color:"#16a34a" }}>{v}</div>
                <div style={{ width:"100%", background:"linear-gradient(to top,#16a34a,#4ade80)", borderRadius:"8px 8px 0 0", height:`${(v/maxPts)*100}%`, minHeight:8 }} />
                <div style={{ fontSize:11, color:"#9ca3af", fontWeight:600 }}>{DAYS[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div style={{ background:"white", borderRadius:20, padding:"22px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #d1fae5" }}>
          <div style={{ fontWeight:800, color:"#064e3b", marginBottom:16 }}>🌍 Activity Breakdown</div>
          {breakdown.map(b => (
            <div key={b.label} style={{ marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, fontWeight:700, marginBottom:4 }}>
                <span>{b.emoji} {b.label}</span><span style={{ color:b.color }}>{b.pct}%</span>
              </div>
              <div style={{ background:"#f0fdf4", borderRadius:10, height:8, overflow:"hidden" }}>
                <div style={{ background:b.color, width:`${b.pct}%`, height:"100%", borderRadius:10 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Full log */}
        <div style={{ background:"white", borderRadius:20, padding:"22px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #d1fae5", gridColumn:"span 2" }}>
          <div style={{ fontWeight:800, color:"#064e3b", marginBottom:16 }}>🌿 Full Activity Log</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {log.map((a,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, background:"#f8fafc", borderRadius:12, padding:"12px 16px", border:"1px solid #e2e8f0" }}>
                <span style={{ fontSize:22 }}>{SCENE_IMAGES[a.scene]?.bgEmoji || "🌿"}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:"#1e293b" }}>{a.text}</div>
                  <div style={{ fontSize:12, color:"#94a3b8" }}>{a.time}</div>
                </div>
                <div style={{ background:`${SCENE_IMAGES[a.scene]?.accent || "#16a34a"}22`, color:SCENE_IMAGES[a.scene]?.accent || "#16a34a", borderRadius:10, padding:"4px 12px", fontWeight:800, fontSize:14 }}>
                  +{a.points} ⭐
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// POINTS PAGE
// ─────────────────────────────────────────────
function PointsPage({ totalPts, log }) {
  const nextLevel = 4000;
  const pct = Math.min((totalPts / nextLevel) * 100, 100);

  return (
    <div style={{ padding:"28px 32px", background:"#f0fdf4", minHeight:"calc(100vh - 120px)" }}>
      <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:28, color:"#064e3b", marginBottom:4 }}>⭐ My Eco Points</div>
      <div style={{ color:"#6b7280", fontSize:14, marginBottom:24, fontWeight:600 }}>Earn points, unlock badges, and share your impact</div>

      <div style={{ display:"grid", gridTemplateColumns:"340px 1fr", gap:20 }}>
        {/* Points card */}
        <div>
          <div style={{ background:"linear-gradient(135deg,#064e3b,#16a34a)", borderRadius:24, padding:"28px", color:"white", textAlign:"center", boxShadow:"0 8px 30px rgba(22,163,74,0.3)", marginBottom:16 }}>
            <div style={{ fontSize:14, fontWeight:700, opacity:0.8, marginBottom:6 }}>TOTAL ECO POINTS</div>
            <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:54 }}>{totalPts.toLocaleString()}</div>
            <div style={{ fontSize:14, opacity:0.8, marginTop:4 }}>⭐ Planet Pal · Level 7</div>
            <div style={{ marginTop:20, background:"rgba(255,255,255,0.15)", borderRadius:14, height:12, overflow:"hidden" }}>
              <div style={{ background:"#fbbf24", width:`${pct}%`, height:"100%", borderRadius:14, transition:"width 0.8s" }} />
            </div>
            <div style={{ fontSize:12, marginTop:6, opacity:0.8 }}>{totalPts.toLocaleString()} / {nextLevel.toLocaleString()} to Eco Hero</div>
            <button style={{ marginTop:16, background:"white", color:"#064e3b", borderRadius:12, padding:"10px 24px", fontSize:14, fontWeight:800, border:"none", width:"100%", cursor:"pointer" }}>
              📤 Share My Score
            </button>
          </div>

          {/* Badges */}
          <div style={{ background:"white", borderRadius:20, padding:"20px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #d1fae5" }}>
            <div style={{ fontWeight:800, color:"#064e3b", marginBottom:12 }}>🎖️ Badges Earned ({BADGES_EARNED.length})</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
              {BADGES_EARNED.map((b,i) => (
                <div key={i} style={{ background:"#f0fdf4", borderRadius:14, padding:"12px", textAlign:"center", border:"1px solid #d1fae5" }}>
                  <div style={{ fontSize:28 }}>{b}</div>
                  <div style={{ fontSize:10, color:"#6b7280", fontWeight:600, marginTop:4 }}>Badge {i+1}</div>
                </div>
              ))}
              {[...Array(4)].map((_,i) => (
                <div key={"l"+i} style={{ background:"#f8fafc", borderRadius:14, padding:"12px", textAlign:"center", border:"1.5px dashed #e2e8f0" }}>
                  <div style={{ fontSize:28, opacity:0.25 }}>🔒</div>
                  <div style={{ fontSize:10, color:"#d1d5db", fontWeight:600, marginTop:4 }}>Locked</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Points history */}
        <div style={{ background:"white", borderRadius:20, padding:"22px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #d1fae5" }}>
          <div style={{ fontWeight:800, color:"#064e3b", marginBottom:16 }}>📋 Points History</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {log.map((a,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", background:"#f8fafc", borderRadius:14, border:"1px solid #e2e8f0" }}>
                <div style={{ width:44, height:44, borderRadius:14, background:`${SCENE_IMAGES[a.scene]?.accent || "#16a34a"}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
                  {SCENE_IMAGES[a.scene]?.bgEmoji || "🌿"}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:"#1e293b" }}>{a.text}</div>
                  <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>🏷 {a.category} · {a.time}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ color:"#16a34a", fontWeight:900, fontSize:18 }}>+{a.points}</div>
                  <div style={{ fontSize:11, color:"#9ca3af", fontWeight:600 }}>Eco Points</div>
                </div>
              </div>
            ))}
          </div>

          {/* How to earn */}
          <div style={{ marginTop:20, background:"#f0fdf4", borderRadius:16, padding:"16px" }}>
            <div style={{ fontWeight:800, color:"#064e3b", marginBottom:12 }}>💡 How to Earn More Points</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[["🌱 Plant a tree","200 pts"],["💧 Save water","90 pts"],["♻️ Recycle waste","80 pts"],["🚲 Green transport","120 pts"],["☀️ Solar/renewable","150 pts"],["📤 Share on social","50 pts"]].map(([act,pts]) => (
                <div key={act} style={{ background:"white", borderRadius:12, padding:"10px 12px", display:"flex", justifyContent:"space-between", alignItems:"center", border:"1px solid #d1fae5" }}>
                  <span style={{ fontSize:13, fontWeight:700, color:"#374151" }}>{act}</span>
                  <span style={{ fontSize:13, fontWeight:900, color:"#16a34a" }}>{pts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// LEADERBOARD PAGE
// ─────────────────────────────────────────────
function LeaderboardPage() {
  const [tab, setTab] = useState("global");
  const podium = [LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]];
  const podiumColors = ["#9ca3af","#fbbf24","#cd7c32"];
  const podiumPos    = [2, 1, 3];
  const podiumHeight = [160, 200, 140];

  return (
    <div style={{ padding:"28px 32px", background:"#f0fdf4", minHeight:"calc(100vh - 120px)" }}>
      <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:28, color:"#064e3b", marginBottom:4 }}>🏆 Eco Leaderboard</div>
      <div style={{ color:"#6b7280", fontSize:14, marginBottom:20, fontWeight:600 }}>See how you compare to the green community!</div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:24, background:"white", padding:6, borderRadius:16, border:"1px solid #d1fae5", width:"fit-content" }}>
        {[["global","🌍 Global"],["friends","👥 Friends"],["weekly","📅 This Week"]].map(([t,label]) => (
          <button key={t} onClick={() => setTab(t)} style={{ padding:"10px 20px", borderRadius:12, border:"none", cursor:"pointer", fontFamily:"inherit", fontWeight:700, fontSize:14, background:tab===t?"#16a34a":"transparent", color:tab===t?"white":"#374151", transition:"all 0.2s" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-end", gap:16, marginBottom:28 }}>
        {podium.map((u,i) => (
          <div key={i} style={{ width:160, background:"white", borderRadius:20, padding:"20px 16px", textAlign:"center", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", border:"1px solid #d1fae5", height:podiumHeight[i], display:"flex", flexDirection:"column", justifyContent:"flex-end", alignItems:"center", gap:6 }}>
            <div style={{ fontSize:36 }}>{u.badge}</div>
            <div style={{ fontWeight:900, fontSize:15, color:"#064e3b" }}>{u.name}{u.isYou?" 👈":""}</div>
            <div style={{ fontSize:12, color:"#6b7280", fontWeight:600 }}>{u.level}</div>
            <div style={{ fontWeight:900, fontSize:20, color:podiumColors[i] }}>{u.pts.toLocaleString()}</div>
            <div style={{ width:48, height:48, borderRadius:"50%", background:podiumColors[i], display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Fredoka One',cursive", fontSize:22, color:"white" }}>#{podiumPos[i]}</div>
          </div>
        ))}
      </div>

      {/* Full list */}
      <div style={{ background:"white", borderRadius:20, padding:"22px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #d1fae5" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {LEADERBOARD.map((u,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", background:u.isYou?"#f0fdf4":"#f8fafc", borderRadius:16, border:u.isYou?"2px solid #16a34a":"1px solid #e2e8f0" }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:["#fbbf24","#9ca3af","#cd7c32","#e2e8f0","#e2e8f0","#e2e8f0"][i], display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:16, color:i<3?"#1a1a1a":"#6b7280" }}>
                {i+1}
              </div>
              <div style={{ fontSize:24 }}>{u.badge}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:800, fontSize:15, color:"#1e293b" }}>
                  {u.name} {u.isYou && <span style={{ background:"#dcfce7", color:"#16a34a", borderRadius:8, padding:"2px 8px", fontSize:11 }}>You</span>}
                </div>
                <div style={{ fontSize:12, color:"#6b7280", fontWeight:600 }}>{u.level} · 🔥 {u.streak} day streak</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontWeight:900, fontSize:18, color:"#064e3b" }}>{u.pts.toLocaleString()}</div>
                <div style={{ fontSize:11, color:"#9ca3af" }}>Eco Points</div>
              </div>
              <button style={{ padding:"8px 14px", borderRadius:10, background:"#f0fdf4", color:"#16a34a", border:"1.5px solid #86efac", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                👋 Challenge
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SETTINGS PAGE
// ─────────────────────────────────────────────
function SettingsPage() {
  const [notif, setNotif]   = useState(true);
  const [dark, setDark]     = useState(false);
  const [lang, setLang]     = useState("English");
  const [privacy, setPrivacy] = useState("Public");

  return (
    <div style={{ padding:"28px 32px", background:"#f0fdf4", minHeight:"calc(100vh - 120px)" }}>
      <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:28, color:"#064e3b", marginBottom:4 }}>⚙️ Settings</div>
      <div style={{ color:"#6b7280", fontSize:14, marginBottom:24, fontWeight:600 }}>Customize your EcoLife experience</div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* Profile */}
        <div style={{ background:"white", borderRadius:20, padding:"24px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #d1fae5" }}>
          <div style={{ fontWeight:800, color:"#064e3b", fontSize:16, marginBottom:16 }}>👤 Profile Settings</div>
          <div style={{ textAlign:"center", marginBottom:16 }}>
            <div style={{ width:80, height:80, borderRadius:"50%", background:"#C8E6C9", border:"3px solid #4CAF50", display:"flex", alignItems:"center", justifyContent:"center", fontSize:40, margin:"0 auto 8px" }}>🧑</div>
            <button style={{ padding:"8px 18px", borderRadius:10, background:"#f0fdf4", color:"#16a34a", border:"1.5px solid #86efac", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
              Change Avatar
            </button>
          </div>
          {[["Display Name","EcoWarrior_07"],["Email","eco@greenlife.com"],["Location","Pune, India"]].map(([l,v]) => (
            <div key={l} style={{ marginBottom:14 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#6b7280", marginBottom:4 }}>{l}</div>
              <input defaultValue={v} style={{ width:"100%", padding:"10px 14px", borderRadius:12, border:"1.5px solid #d1fae5", fontSize:14, fontFamily:"inherit", outline:"none", background:"#f0fdf4", boxSizing:"border-box", color:"#374151" }}
                onFocus={e => e.target.style.borderColor="#16a34a"}
                onBlur={e => e.target.style.borderColor="#d1fae5"} />
            </div>
          ))}
          <button style={{ width:"100%", padding:"12px", borderRadius:12, background:"linear-gradient(135deg,#16a34a,#065f46)", color:"white", fontSize:14, fontWeight:800, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
            Save Profile 💾
          </button>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* Preferences */}
          <div style={{ background:"white", borderRadius:20, padding:"24px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #d1fae5" }}>
            <div style={{ fontWeight:800, color:"#064e3b", fontSize:16, marginBottom:16 }}>🎨 Preferences</div>
            {[["🔔 Daily Reminders", notif, setNotif],["🌙 Dark Mode", dark, setDark]].map(([l,val,set]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <span style={{ fontSize:14, fontWeight:700, color:"#374151" }}>{l}</span>
                <div onClick={() => set(!val)} style={{ width:48, height:26, borderRadius:13, background:val?"#16a34a":"#d1d5db", cursor:"pointer", position:"relative", transition:"all 0.3s" }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:"white", position:"absolute", top:2, left:val?24:2, transition:"left 0.3s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }} />
                </div>
              </div>
            ))}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#6b7280", marginBottom:4 }}>🌐 Language</div>
              <select value={lang} onChange={e => setLang(e.target.value)} style={{ width:"100%", padding:"10px 14px", borderRadius:12, border:"1.5px solid #d1fae5", fontSize:14, fontFamily:"inherit", background:"#f0fdf4", outline:"none", color:"#374151" }}>
                {["English","Hindi","Marathi","Spanish","French"].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:"#6b7280", marginBottom:4 }}>🔒 Privacy</div>
              <select value={privacy} onChange={e => setPrivacy(e.target.value)} style={{ width:"100%", padding:"10px 14px", borderRadius:12, border:"1.5px solid #d1fae5", fontSize:14, fontFamily:"inherit", background:"#f0fdf4", outline:"none", color:"#374151" }}>
                {["Public","Friends Only","Private"].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          {/* Danger zone */}
          <div style={{ background:"#fff5f5", borderRadius:20, padding:"20px", border:"1px solid #fecaca" }}>
            <div style={{ fontWeight:800, color:"#dc2626", fontSize:14, marginBottom:10 }}>⚠️ Account</div>
            {[["📥 Download My Data"],["🔄 Reset Points"],["🗑️ Delete Account"]].map(([l]) => (
              <button key={l} style={{ width:"100%", padding:"10px", borderRadius:10, background:"white", color:"#dc2626", border:"1px solid #fecaca", fontSize:13, fontWeight:700, marginBottom:8, cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN DASHBOARD (HOME WRAPPER)
// ─────────────────────────────────────────────
export default function Dashboard({ userName }) {
  const [page, setPage]               = useState("home");
  const [currentScene, setCurrentScene] = useState(DEFAULT_SCENE);
  const [log, setLog]                 = useState(INITIAL_LOG);
  const [totalPts, setTotalPts]       = useState(3150);
  const [pointsToday, setPointsToday] = useState(320);
  const [streak, setStreak]           = useState(14);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatOpen, setChatOpen]       = useState(true);
  const [toast, setToast]             = useState(null);

  const scene    = SCENE_IMAGES[currentScene] || SCENE_IMAGES[DEFAULT_SCENE];
  const co2Saved = (pointsToday / 10).toFixed(1);

  function showToast(title, emoji, sub, color) {
    setToast({ title, emoji, sub, color: color || "#16a34a" });
    setTimeout(() => setToast(null), 4000);
  }

  async function handleActivitySubmit(text) {
    setIsAnalyzing(true);
    setCurrentScene("thinking");
    setChatOpen(true);
    try {
      const result = await analyzeActivity(text);
      setCurrentScene(result.scene);
      const now = new Date();
      const h = now.getHours();
      const timeStr = `Today ${h}:${String(now.getMinutes()).padStart(2,"0")} ${h < 12 ? "AM" : "PM"}`;
      setLog(prev => [{ text, points: result.points, scene: result.scene, category: result.category, feedback: result.feedback, isPositive: result.isPositive, time: timeStr }, ...prev]);
      setTotalPts(p => p + result.points);
      setPointsToday(p => p + result.points);
      setStreak(s => s + 1);
      setChatOpen(true);
      showToast(`+${result.points} Eco Points!`, result.isPositive ? "🌟" : "⚠️", result.feedback, result.isPositive ? "#16a34a" : "#f59e0b");
    } catch {
      setCurrentScene(DEFAULT_SCENE);
      showToast("Activity logged!", "🌿", "Keep up the great work!", "#16a34a");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div style={{ fontFamily:"'Nunito','Segoe UI',sans-serif", minHeight:"100vh", background:"#F1F8F2", display:"flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:6px }
        ::-webkit-scrollbar-thumb { background:#86efac; border-radius:10px }
      `}</style>

      <Navbar totalPts={totalPts} streak={streak} page={page} setPage={setPage} />
      <div style={{ marginLeft:220, flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
      <Toast toast={toast} />

      {/* ── HOME ── */}
      {page === "home" && (
        <>
          <HeroBanner
            userName={userName}
            bgGradient={scene.bgGradient}
            bgLabel={scene.bgLabel}
            bgEmoji={scene.bgEmoji}
            bgImage={scene.bg}
          />
          <div style={{ marginTop:20, padding:"0 20px" }}>
            <StatsRow activitiesCount={log.length} co2Saved={co2Saved} pointsToday={pointsToday} streak={streak} />
          </div>
          <ActivityInput onSubmit={handleActivitySubmit} isAnalyzing={isAnalyzing} />
          <ActivityLog log={log} />
          <CharacterDisplay mood={scene.charMood || "happy"} charImg={scene.char} tip={scene.tip} isOpen={chatOpen} onToggle={() => setChatOpen(o => !o)} />
          <button onClick={() => setChatOpen(true)} style={{ position:"fixed", bottom:24, right:24, width:52, height:52, borderRadius:"50%", background:"#4CAF50", border:"none", fontSize:22, cursor:"pointer", boxShadow:"0 4px 16px rgba(76,175,80,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:60 }}>💬</button>
        </>
      )}

      {/* ── DASHBOARD ── */}
      {page === "dashboard" && <DashboardPage log={log} totalPts={totalPts} streak={streak} />}

      {/* ── POINTS ── */}
      {page === "points" && <PointsPage totalPts={totalPts} log={log} />}

      {/* ── LEADERBOARD ── */}
      {page === "leaderboard" && <LeaderboardPage />}

      {/* ── SETTINGS ── */}
      {page === "settings" && <SettingsPage />}

      <footer style={{ background:"#064e3b", color:"#6ee7b7", textAlign:"center", padding:"16px", fontSize:13, fontWeight:600 }}>
        🌱 EcoLife — Every action matters. Together we heal the planet. 🌍 &nbsp;|&nbsp; Made with 💚
      </footer>
      </div>
    </div>
  );
}