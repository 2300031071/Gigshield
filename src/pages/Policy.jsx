import { useState } from "react";

const PLANS = [
  { id: "basic", name: "Basic Shield", price: 49, coverage: 800, color: "var(--accent)" },
  { id: "pro", name: "Pro Shield", price: 99, coverage: 1500, color: "var(--accent2)", popular: true },
  { id: "max", name: "Max Shield", price: 149, coverage: 2500, color: "var(--accent3)" },
];

const TRIGGERS = [
  { icon: "🌧️", name: "Heavy Rain", threshold: "Rainfall > 50mm/hr", payout: "₹150/hr (max 5hrs)", api: "OpenWeatherMap API" },
  { icon: "🌊", name: "Flood Warning", threshold: "Zone flood alert issued", payout: "₹200/hr (max 4hrs)", api: "IMD Flood API" },
  { icon: "🌫️", name: "Severe Pollution", threshold: "AQI > 300", payout: "₹120/hr (max 4hrs)", api: "CPCB AQI API" },
  { icon: "🥵", name: "Extreme Heat", threshold: "Temperature > 45°C", payout: "₹100/hr (max 6hrs)", api: "OpenWeatherMap API" },
  { icon: "🚫", name: "Zone Curfew", threshold: "Official curfew notice", payout: "₹180/hr (max 8hrs)", api: "Gov Alert API" },
  { icon: "⚡", name: "Platform Outage", threshold: "App down > 30 mins", payout: "₹130/hr (max 3hrs)", api: "Platform Status API" },
];

export default function Policy({ worker, navigate }) {
  const [selectedPlan, setSelectedPlan] = useState(worker?.plan?.id || "pro");
  const currentPlan = PLANS.find(p => p.id === selectedPlan);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-head)", fontSize: "28px", fontWeight: 800, marginBottom: 6 }}>My Policy</h1>
        <p style={{ color: "var(--muted)" }}>Manage your weekly coverage plan and view all parametric triggers.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>
        <div>
          {/* Plan selector */}
          <div className="card" style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700, marginBottom: 16 }}>Active Plan</p>
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              {PLANS.map(p => (
                <button key={p.id} onClick={() => setSelectedPlan(p.id)} style={{
                  flex: 1, minWidth: 140, padding: "16px", borderRadius: 12, cursor: "pointer",
                  border: `1.5px solid ${selectedPlan === p.id ? p.color : "var(--border)"}`,
                  background: selectedPlan === p.id ? `${p.color}11` : "var(--bg3)",
                  transition: "all 0.2s", textAlign: "left", position: "relative"
                }}>
                  {p.popular && <div style={{ position: "absolute", top: -8, right: 10, background: p.color, color: "#0A0E1A", fontSize: "9px", fontWeight: 800, fontFamily: "var(--font-head)", borderRadius: 50, padding: "2px 8px" }}>BEST</div>}
                  <p style={{ fontFamily: "var(--font-head)", fontSize: "13px", fontWeight: 700, color: p.color, marginBottom: 4 }}>{p.name}</p>
                  <p style={{ fontFamily: "var(--font-head)", fontSize: "20px", fontWeight: 800 }}>₹{p.price}<span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 400 }}>/wk</span></p>
                  <p style={{ fontSize: "11px", color: "var(--muted)", marginTop: 4 }}>Up to ₹{p.coverage}/week</p>
                </button>
              ))}
            </div>
            <button className="btn-primary" style={{ width: "100%" }}>
              {worker?.plan?.id === selectedPlan ? "✓ Current Plan" : `Switch to ${currentPlan.name} →`}
            </button>
          </div>

          {/* Parametric Triggers */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700 }}>Parametric Triggers</p>
              <span className="tag">6 Active</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {TRIGGERS.map((t, i) => (
                <div key={i} style={{ padding: "14px 16px", background: "var(--bg3)", borderRadius: 12, display: "grid", gridTemplateColumns: "auto 1fr 1fr auto", gap: 16, alignItems: "center" }}>
                  <span style={{ fontSize: "24px" }}>{t.icon}</span>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, marginBottom: 2 }}>{t.name}</p>
                    <p style={{ fontSize: "11px", color: "var(--muted)" }}>Trigger: {t.threshold}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600 }}>{t.payout}</p>
                    <p style={{ fontSize: "11px", color: "var(--muted)" }}>{t.api}</p>
                  </div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulse 2s infinite" }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card">
            <p style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700, marginBottom: 16 }}>Policy Details</p>
            {[
              { label: "Policy Number", val: "GS-2024-BLR-00847" },
              { label: "Partner ID", val: worker?.partnerId || "ZPT-482910" },
              { label: "Platform", val: worker?.platform || "Zepto" },
              { label: "City", val: worker?.city || "Bengaluru" },
              { label: "Zone", val: worker?.zone || "Koramangala" },
              { label: "Coverage Start", val: "Mon, Mar 17, 2025" },
              { label: "Next Renewal", val: "Mon, Mar 24, 2025" },
              { label: "Premium Auto-debit", val: "Every Monday" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 7 ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontSize: "12px", color: "var(--muted)" }}>{r.label}</span>
                <span style={{ fontSize: "12px", fontWeight: 600 }}>{r.val}</span>
              </div>
            ))}
          </div>

          <div className="card">
            <p style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700, marginBottom: 14 }}>Exclusions</p>
            {["Vehicle repair costs", "Medical / health expenses", "Life / accident insurance", "Personal liability", "Pre-existing damage"].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ color: "var(--red)", fontSize: "14px", marginTop: 1 }}>✕</span>
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>{e}</span>
              </div>
            ))}
          </div>

          <button className="btn-secondary" style={{ width: "100%", color: "var(--red)", borderColor: "rgba(255,71,87,0.3)" }}>
            Cancel Policy
          </button>
        </div>
      </div>
    </div>
  );
}
