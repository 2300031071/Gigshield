import { useState, useEffect } from "react";

const ALERTS = [
  { id: 1, icon: "🌧️", title: "Heavy Rain Alert", location: "Your Zone", severity: "HIGH", status: "MONITORING", time: "Live", color: "#4A9EFF" },
  { id: 2, icon: "🌫️", title: "AQI Spike — 318", location: "City Wide", severity: "HIGH", status: "CLAIM READY", time: "2h ago", color: "var(--red)" },
  { id: 3, icon: "🥵", title: "Heat Warning 44°C", location: "Peripheral Zones", severity: "MED", status: "WATCH", time: "4h ago", color: "var(--accent2)" },
];

function StatCard({ icon, label, value, sub, accent }) {
  return (
    <div className="card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(${accent}, 0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>{icon}</div>
      <div>
        <p style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{label}</p>
        <p style={{ fontFamily: "var(--font-head)", fontSize: "24px", fontWeight: 800, lineHeight: 1 }}>{value}</p>
        {sub && <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: 4 }}>{sub}</p>}
      </div>
    </div>
  );
}

function WeatherWidget({ city }) {
  const [weather, setWeather] = useState({ temp: 32, aqi: 142, rain: 12, condition: "Partly Cloudy" });
  useEffect(() => {
    // Simulate weather fetch
    const t = setTimeout(() => {
      setWeather({ temp: Math.floor(28 + Math.random() * 12), aqi: Math.floor(100 + Math.random() * 250), rain: Math.floor(Math.random() * 80), condition: ["Heavy Rain", "Sunny", "Overcast", "Partly Cloudy"][Math.floor(Math.random() * 4)] });
    }, 1000);
    return () => clearTimeout(t);
  }, []);
  const aqiColor = weather.aqi > 200 ? "var(--red)" : weather.aqi > 150 ? "var(--accent2)" : "var(--accent)";
  return (
    <div className="card">
      <p style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Live Conditions — {city || "Bengaluru"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "28px" }}>🌡️</div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: "20px", fontWeight: 700 }}>{weather.temp}°C</div>
          <div style={{ fontSize: "11px", color: "var(--muted)" }}>Temperature</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "28px" }}>🌫️</div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: "20px", fontWeight: 700, color: aqiColor }}>{weather.aqi}</div>
          <div style={{ fontSize: "11px", color: "var(--muted)" }}>AQI</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "28px" }}>🌧️</div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: "20px", fontWeight: 700 }}>{weather.rain}%</div>
          <div style={{ fontSize: "11px", color: "var(--muted)" }}>Rain chance</div>
        </div>
      </div>
      {weather.aqi > 200 && (
        <div style={{ marginTop: 16, background: "rgba(255,71,87,0.1)", border: "1px solid rgba(255,71,87,0.3)", borderRadius: 10, padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" }}>
          <span>⚠️</span>
          <span style={{ fontSize: "13px", color: "var(--red)", fontWeight: 600 }}>AQI exceeds 200 — Coverage may trigger</span>
        </div>
      )}
    </div>
  );
}

export default function Dashboard({ worker, navigate }) {
  const plan = worker?.plan || { name: "Pro Shield", price: 99, coverage: 1500 };
  const city = worker?.city || "Bengaluru";
  const [weekEarning] = useState(Math.floor(Math.random() * 800 + 2200));
  const [activeSince] = useState("Mon, Mar 17");

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
      {/* Welcome banner */}
      <div style={{
        background: "linear-gradient(135deg, rgba(0,229,160,0.1), rgba(0,229,160,0.03))",
        border: "1px solid rgba(0,229,160,0.2)", borderRadius: 20, padding: "24px 28px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 28, flexWrap: "wrap", gap: 16
      }}>
        <div>
          <p style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>🛡️ Coverage Active</p>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800 }}>Hey {worker?.name?.split(" ")[0] || "Ravi"} 👋</h2>
          <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: 4 }}>{plan.name} · Active since {activeSince} · Renews Monday</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-secondary" style={{ fontSize: "13px", padding: "9px 18px" }} onClick={() => navigate("claims")}>File Claim</button>
          <button className="btn-primary" style={{ fontSize: "13px", padding: "9px 18px" }} onClick={() => navigate("policy")}>View Policy</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        <StatCard icon="💰" label="Protected This Week" value={`₹${plan.coverage}`} sub={`Max payout coverage`} accent="0,229,160" />
        <StatCard icon="📅" label="Weekly Premium" value={`₹${plan.price}`} sub="Auto-deducted Monday" accent="255,184,0" />
        <StatCard icon="📦" label="Deliveries This Week" value={weekEarning > 2800 ? "47" : "31"} sub={`~₹${weekEarning} earned so far`} accent="255,107,53" />
      </div>

      {/* Main content grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <WeatherWidget city={city} />

          {/* Disruption alerts */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700 }}>Active Alerts</p>
              <span style={{ background: "rgba(255,71,87,0.15)", color: "var(--red)", fontSize: "11px", fontWeight: 700, borderRadius: 50, padding: "2px 10px" }}>3 active</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ALERTS.map(a => (
                <div key={a.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 14px", background: "var(--bg3)", borderRadius: 12, border: `1px solid ${a.color}22` }}>
                  <span style={{ fontSize: "22px" }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, marginBottom: 2 }}>{a.title}</p>
                    <p style={{ fontSize: "12px", color: "var(--muted)" }}>{a.location} · {a.time}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ background: a.color + "22", color: a.color, borderRadius: 50, padding: "3px 10px", fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-head)", marginBottom: 4 }}>{a.status}</div>
                    <div style={{ fontSize: "11px", color: "var(--muted)" }}>{a.severity} severity</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payout history */}
          <div className="card">
            <p style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700, marginBottom: 16 }}>Payout History</p>
            {[
              { date: "Mar 10", reason: "Heavy Rain — 4.5hrs", amount: 675, status: "Paid" },
              { date: "Mar 3", reason: "AQI Alert — 2hrs", amount: 300, status: "Paid" },
              { date: "Feb 24", reason: "Curfew — South Zone", amount: 900, status: "Paid" },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500 }}>{p.reason}</p>
                  <p style={{ fontSize: "12px", color: "var(--muted)" }}>{p.date}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "var(--font-head)", fontSize: "16px", fontWeight: 700, color: "var(--accent)" }}>+₹{p.amount}</p>
                  <p style={{ fontSize: "11px", color: "var(--accent)", background: "rgba(0,229,160,0.1)", borderRadius: 50, padding: "1px 8px" }}>{p.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Coverage summary */}
          <div className="card">
            <p style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700, marginBottom: 16 }}>This Week's Coverage</p>
            {[
              { label: "Days Covered", val: "5 of 7", pct: 71 },
              { label: "Hours Eligible", val: "18 hrs", pct: 60 },
              { label: "Payout Used", val: `₹975 / ₹${plan.coverage}`, pct: Math.round(975 / plan.coverage * 100) },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: "13px", color: "var(--muted)" }}>{item.label}</span>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>{item.val}</span>
                </div>
                <div style={{ height: 4, background: "var(--bg3)", borderRadius: 4 }}>
                  <div style={{ height: "100%", background: "var(--accent)", borderRadius: 4, width: `${item.pct}%`, transition: "width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="card">
            <p style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700, marginBottom: 14 }}>Quick Actions</p>
            {[
              { icon: "📋", label: "View Policy Details", action: () => navigate("policy") },
              { icon: "⚡", label: "File a Claim Now", action: () => navigate("claims") },
              { icon: "📊", label: "Earning Analytics", action: () => {} },
              { icon: "🔔", label: "Alert Preferences", action: () => {} },
            ].map((a, i) => (
              <button key={i} onClick={a.action} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", background: "var(--bg3)", border: "none",
                borderRadius: 10, color: "var(--text)", cursor: "pointer",
                marginBottom: i < 3 ? 8 : 0, textAlign: "left",
                transition: "background 0.2s", fontSize: "13px"
              }}>
                <span>{a.icon}</span>{a.label}
              </button>
            ))}
          </div>

          {/* AI Tip */}
          <div style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.1), rgba(255,107,53,0.08))", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 14, padding: 18 }}>
            <p style={{ fontSize: "11px", color: "var(--accent2)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>🤖 AI Insight</p>
            <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--text)" }}>
              Rain probability is <strong>68%</strong> tomorrow afternoon. Consider filing early if you can't complete orders. Your zone has 3 active disruption watches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
