import { useState } from "react";

const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"];
const ZONES = {
  Mumbai: ["Andheri", "Bandra", "Kurla", "Dharavi", "Malad", "Powai"],
  Delhi: ["Connaught Place", "Lajpat Nagar", "Dwarka", "Rohini", "Karol Bagh"],
  Bengaluru: ["Koramangala", "Whitefield", "Indiranagar", "HSR Layout", "Jayanagar"],
  Hyderabad: ["Banjara Hills", "Hitech City", "Gachibowli", "Kukatpally", "LB Nagar"],
  Chennai: ["T.Nagar", "Adyar", "Anna Nagar", "Velachery", "Porur"],
  Pune: ["Kothrud", "Hinjewadi", "Viman Nagar", "Wakad", "Shivajinagar"],
  Kolkata: ["Salt Lake", "Park Street", "Behala", "Tollygunge", "Howrah"],
  Ahmedabad: ["Navrangpura", "Satellite", "Maninagar", "Bopal", "Vastrapur"],
};

const STEPS = ["Personal Info", "Work Profile", "Risk Assessment", "Plan Selection"];

function RiskMeter({ score }) {
  const color = score < 40 ? "var(--accent)" : score < 70 ? "var(--accent2)" : "var(--red)";
  const label = score < 40 ? "LOW RISK" : score < 70 ? "MEDIUM RISK" : "HIGH RISK";
  return (
    <div className="card" style={{ textAlign: "center", padding: 32 }}>
      <p style={{ color: "var(--muted)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
        AI Risk Score
      </p>
      <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 20px" }}>
        <svg viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)", width: "100%", height: "100%" }}>
          <circle cx="70" cy="70" r="58" fill="none" stroke="var(--bg3)" strokeWidth="12" />
          <circle cx="70" cy="70" r="58" fill="none" stroke={color} strokeWidth="12"
            strokeDasharray={`${(score / 100) * 364} 364`}
            strokeLinecap="round" style={{ transition: "all 1s ease" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "var(--font-head)", fontSize: "32px", fontWeight: 800, color }}>{score}</span>
          <span style={{ fontSize: "10px", color: "var(--muted)" }}>/ 100</span>
        </div>
      </div>
      <div style={{ background: color, borderRadius: 50, padding: "4px 16px", display: "inline-block" }}>
        <span style={{ fontFamily: "var(--font-head)", fontSize: "11px", fontWeight: 800, color: "#0A0E1A", letterSpacing: "0.08em" }}>{label}</span>
      </div>
    </div>
  );
}

const PLANS = [
  {
    id: "basic", name: "Basic Shield", price: 49, color: "var(--accent)",
    coverage: 800, hours: 3,
    features: ["Rain & Flood coverage", "Curfew protection", "UPI instant payout", "24/7 claim support"],
  },
  {
    id: "pro", name: "Pro Shield", price: 99, color: "var(--accent2)",
    coverage: 1500, hours: 5,
    features: ["All Basic features", "Extreme heat coverage", "Pollution (AQI>300)", "Priority processing", "₹1500/week max payout"],
    popular: true,
  },
  {
    id: "max", name: "Max Shield", price: 149, color: "var(--accent3)",
    coverage: 2500, hours: 8,
    features: ["All Pro features", "App outage coverage", "Zone closure protection", "Instant payout guarantee", "AI concierge support"],
  },
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", phone: "", partnerId: "", platform: "Zepto",
    city: "Bengaluru", zone: "", yearsExp: "1", avgWeeklyEarning: "3500",
    plan: "pro"
  });
  const [riskScore, setRiskScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calcRisk = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulated AI risk scoring
      let score = 45;
      if (form.city === "Mumbai" || form.city === "Kolkata") score += 20;
      if (form.city === "Delhi") score += 15;
      if (parseInt(form.yearsExp) < 1) score += 10;
      if (parseInt(form.avgWeeklyEarning) > 4000) score += 5;
      if (form.platform === "Blinkit") score += 8;
      setRiskScore(Math.min(score, 95));
      setLoading(false);
    }, 1800);
  };

  const nextStep = () => {
    if (step === 1) calcRisk();
    setStep(s => s + 1);
  };

  const submit = () => {
    onComplete({ ...form, riskScore, plan: PLANS.find(p => p.id === form.plan) });
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px" }}>
      {/* Progress */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", margin: "0 auto 6px",
                background: i <= step ? "var(--accent)" : "var(--bg3)",
                border: `2px solid ${i <= step ? "var(--accent)" : "var(--border)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-head)", fontSize: "13px", fontWeight: 700,
                color: i <= step ? "#0A0E1A" : "var(--muted)",
                transition: "all 0.3s"
              }}>{i < step ? "✓" : i + 1}</div>
              <span style={{ fontSize: "11px", color: i === step ? "var(--accent)" : "var(--muted)", fontWeight: i === step ? 600 : 400 }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 3, background: "var(--bg3)", borderRadius: 3 }}>
          <div style={{ height: "100%", background: "var(--accent)", borderRadius: 3, width: `${(step / 3) * 100}%`, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Step 0: Personal Info */}
      {step === 0 && (
        <div style={{ animation: "fadeUp 0.4s ease" }}>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "26px", fontWeight: 800, marginBottom: 8 }}>Personal Info</h2>
          <p style={{ color: "var(--muted)", marginBottom: 28 }}>Let's get you set up in 3 minutes.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div><label>Full Name</label><input placeholder="e.g. Ravi Kumar" value={form.name} onChange={e => set("name", e.target.value)} /></div>
            <div><label>Mobile Number</label><input placeholder="+91 98765 43210" value={form.phone} onChange={e => set("phone", e.target.value)} /></div>
            <div><label>Partner Platform</label>
              <select value={form.platform} onChange={e => set("platform", e.target.value)}>
                <option>Zepto</option><option>Blinkit</option><option>Swiggy Instamart</option>
              </select>
            </div>
            <div><label>Partner ID / Employee Code</label><input placeholder="ZPT-XXXXXX" value={form.partnerId} onChange={e => set("partnerId", e.target.value)} /></div>
          </div>
        </div>
      )}

      {/* Step 1: Work Profile */}
      {step === 1 && (
        <div style={{ animation: "fadeUp 0.4s ease" }}>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "26px", fontWeight: 800, marginBottom: 8 }}>Work Profile</h2>
          <p style={{ color: "var(--muted)", marginBottom: 28 }}>Help our AI understand your working pattern.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div><label>Operating City</label>
              <select value={form.city} onChange={e => { set("city", e.target.value); set("zone", ""); }}>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label>Primary Zone / Area</label>
              <select value={form.zone} onChange={e => set("zone", e.target.value)}>
                <option value="">Select zone...</option>
                {(ZONES[form.city] || []).map(z => <option key={z}>{z}</option>)}
              </select>
            </div>
            <div className="grid-2">
              <div><label>Years as Delivery Partner</label>
                <select value={form.yearsExp} onChange={e => set("yearsExp", e.target.value)}>
                  {["<1", "1", "2", "3", "4", "5+"].map(y => <option key={y} value={y}>{y} {y === "<1" ? "year" : "years"}</option>)}
                </select>
              </div>
              <div><label>Avg Weekly Earning (₹)</label>
                <input type="number" placeholder="3500" value={form.avgWeeklyEarning} onChange={e => set("avgWeeklyEarning", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Risk Assessment */}
      {step === 2 && (
        <div style={{ animation: "fadeUp 0.4s ease" }}>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "26px", fontWeight: 800, marginBottom: 8 }}>AI Risk Assessment</h2>
          <p style={{ color: "var(--muted)", marginBottom: 28 }}>Our AI analyzed your zone, city, and work history.</p>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ width: 48, height: 48, border: "3px solid var(--bg3)", borderTop: "3px solid var(--accent)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 20px" }} />
              <p style={{ color: "var(--muted)" }}>Analyzing your risk profile...</p>
            </div>
          ) : riskScore !== null ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <RiskMeter score={riskScore} />
              <div className="card">
                <p style={{ color: "var(--muted)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Risk Factors Detected</p>
                {[
                  { label: "Zone flood history", val: form.city === "Mumbai" || form.city === "Kolkata" ? "High" : "Low", bad: form.city === "Mumbai" || form.city === "Kolkata" },
                  { label: "Pollution exposure", val: form.city === "Delhi" ? "High" : "Moderate", bad: form.city === "Delhi" },
                  { label: "Experience level", val: parseInt(form.yearsExp) >= 2 ? "Experienced" : "New Partner", bad: false },
                  { label: "Avg earning at risk", val: `₹${Math.round(parseInt(form.avgWeeklyEarning) * 0.28)}/week`, bad: false },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                    <span style={{ fontSize: "13px", color: "var(--muted)" }}>{r.label}</span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: r.bad ? "var(--red)" : "var(--accent)" }}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Step 3: Plan Selection */}
      {step === 3 && (
        <div style={{ animation: "fadeUp 0.4s ease" }}>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "26px", fontWeight: 800, marginBottom: 8 }}>Choose Your Plan</h2>
          <p style={{ color: "var(--muted)", marginBottom: 28 }}>Weekly coverage. Cancel anytime. Auto-renews every Monday.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {PLANS.map(plan => (
              <div key={plan.id} onClick={() => set("plan", plan.id)} style={{
                padding: "20px 22px", borderRadius: 14, cursor: "pointer",
                border: `1.5px solid ${form.plan === plan.id ? plan.color : "var(--border)"}`,
                background: form.plan === plan.id ? `rgba(${plan.id === "pro" ? "255,184,0" : plan.id === "max" ? "255,107,53" : "0,229,160"},0.06)` : "var(--card)",
                transition: "all 0.2s", position: "relative"
              }}>
                {plan.popular && <div style={{ position: "absolute", top: -10, right: 16, background: plan.color, color: "#0A0E1A", fontSize: "10px", fontWeight: 800, fontFamily: "var(--font-head)", borderRadius: 50, padding: "2px 10px", letterSpacing: "0.06em" }}>RECOMMENDED</div>}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontFamily: "var(--font-head)", fontSize: "16px", fontWeight: 700, color: plan.color }}>{plan.name}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800 }}>₹{plan.price}<span style={{ fontSize: "13px", fontWeight: 400, color: "var(--muted)" }}>/week</span></div>
                    <div style={{ fontSize: "11px", color: "var(--muted)" }}>Max ₹{plan.coverage}/week payout</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {plan.features.map((f, i) => (
                    <span key={i} style={{ fontSize: "11px", background: "var(--bg3)", borderRadius: 50, padding: "3px 10px", color: "var(--muted)" }}>✓ {f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
        {step > 0 && <button className="btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>}
        {step < 3 ? (
          <button className="btn-primary" style={{ flex: 1 }} onClick={nextStep}
            disabled={step === 0 && (!form.name || !form.phone)}>
            Continue →
          </button>
        ) : (
          <button className="btn-primary" style={{ flex: 1 }} onClick={submit}>
            🛡️ Activate Coverage →
          </button>
        )}
      </div>
    </div>
  );
}
