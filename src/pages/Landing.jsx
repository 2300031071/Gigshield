import { useState, useEffect } from "react";

const DISRUPTIONS = [
  { icon: "🌧️", label: "Heavy Rain", desc: "Deliveries halted" },
  { icon: "🌫️", label: "Severe Pollution (AQI>300)", desc: "Unsafe to ride" },
  { icon: "🌊", label: "Flooding", desc: "Routes blocked" },
  { icon: "🥵", label: "Extreme Heat (>45°C)", desc: "Cannot work outdoors" },
  { icon: "🚫", label: "Zone Curfew", desc: "Access denied" },
  { icon: "⚡", label: "App Outage", desc: "Platform down" },
];

export default function Landing({ onStart }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % DISRUPTIONS.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Ambient background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,229,160,0.12) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", top: "30%", right: "-10%", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(255,184,0,0.06) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      {/* Header */}
      <header style={{ padding: "24px 48px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: 38, height: 38, borderRadius: "12px",
          background: "linear-gradient(135deg, var(--accent), #00b378)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px"
        }}>⚡</div>
        <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "20px" }}>
          Gig<span style={{ color: "var(--accent)" }}>Shield</span>
        </span>
        <div style={{ marginLeft: "auto" }}>
          <span className="tag">Phase 1 Prototype</span>
        </div>
      </header>

      {/* Hero */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 48px 80px" }}>
        <div style={{ animation: "fadeUp 0.7s ease both" }}>
          <div style={{ marginBottom: 20 }}>
            <span style={{
              background: "rgba(255,107,53,0.15)", color: "var(--accent3)",
              borderRadius: "50px", padding: "5px 14px",
              fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-head)",
              letterSpacing: "0.08em"
            }}>🛵 FOR ZEPTO & BLINKIT DELIVERY PARTNERS</span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-head)", fontSize: "clamp(42px, 6vw, 76px)",
            fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em",
            maxWidth: 750, marginBottom: 28
          }}>
            Your income,<br />
            <span style={{ color: "var(--accent)" }}>protected</span> against<br />
            every disruption.
          </h1>

          <p style={{ color: "var(--muted)", fontSize: "18px", maxWidth: 520, marginBottom: 40, lineHeight: 1.7 }}>
            AI-powered parametric insurance for grocery delivery partners.
            When rain stops your rides, we cover your lost wages — automatically, instantly.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: 64 }}>
            <button className="btn-primary" onClick={onStart} style={{ fontSize: "16px", padding: "15px 36px" }}>
              Get Protected Now →
            </button>
            <button className="btn-secondary">Watch Demo</button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid-3" style={{ marginBottom: 64, animation: "fadeUp 0.7s 0.2s ease both", opacity: 0, animationFillMode: "forwards" }}>
          {[
            { val: "₹49", sub: "Starting from per week", accent: "var(--accent)" },
            { val: "< 2 min", sub: "Avg claim processing time", accent: "var(--accent2)" },
            { val: "100%", sub: "Automated payout via UPI", accent: "var(--accent3)" },
          ].map((s, i) => (
            <div key={i} className="card" style={{ borderColor: "var(--border)", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-head)", fontSize: "36px", fontWeight: 800, color: s.accent, marginBottom: 6 }}>{s.val}</div>
              <div style={{ color: "var(--muted)", fontSize: "13px" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Disruption carousel */}
        <div style={{ animation: "fadeUp 0.7s 0.4s ease both", opacity: 0, animationFillMode: "forwards" }}>
          <p style={{ color: "var(--muted)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
            Covered Disruptions
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {DISRUPTIONS.map((d, i) => (
              <div key={i} className="card" style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "12px 18px", borderRadius: 50,
                border: i === active ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                background: i === active ? "rgba(0,229,160,0.08)" : "var(--card)",
                transition: "all 0.3s"
              }}>
                <span style={{ fontSize: "20px" }}>{d.icon}</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, fontFamily: "var(--font-head)" }}>{d.label}</div>
                  <div style={{ fontSize: "11px", color: "var(--muted)" }}>{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={{ marginTop: 80, animation: "fadeUp 0.7s 0.6s ease both", opacity: 0, animationFillMode: "forwards" }}>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "28px", fontWeight: 700, marginBottom: 32 }}>
            How it works
          </h2>
          <div className="grid-3">
            {[
              { step: "01", icon: "📋", title: "Quick Onboarding", desc: "Sign up in 3 minutes. Link your Zepto/Blinkit Partner ID. AI profiles your risk zone." },
              { step: "02", icon: "🛡️", title: "Weekly Coverage", desc: "Choose a plan. Pay ₹49–₹149/week. Coverage activates instantly, aligned to your earn cycle." },
              { step: "03", icon: "💸", title: "Auto Claim & Payout", desc: "Disruption detected via APIs → Claim auto-triggered → ₹ sent to your UPI in minutes." },
            ].map((s, i) => (
              <div key={i} className="card" style={{ position: "relative", overflow: "hidden" }}>
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  fontFamily: "var(--font-head)", fontSize: "48px", fontWeight: 800,
                  color: "rgba(255,255,255,0.03)", lineHeight: 1
                }}>{s.step}</div>
                <div style={{ fontSize: "32px", marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "var(--font-head)", fontSize: "17px", fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 80, textAlign: "center", padding: "60px",
          background: "linear-gradient(135deg, rgba(0,229,160,0.08), rgba(0,229,160,0.03))",
          borderRadius: 24, border: "1px solid rgba(0,229,160,0.15)",
          animation: "fadeUp 0.7s 0.8s ease both", opacity: 0, animationFillMode: "forwards"
        }}>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "32px", fontWeight: 800, marginBottom: 12 }}>
            Ready to protect your income?
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 28 }}>Join thousands of Zepto & Blinkit partners already protected.</p>
          <button className="btn-primary" onClick={onStart} style={{ fontSize: "16px", padding: "15px 40px" }}>
            Start My Coverage →
          </button>
        </div>
      </main>
    </div>
  );
}
