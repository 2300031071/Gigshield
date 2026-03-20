import { useState } from "react";

const DISRUPTION_TYPES = [
  { id: "rain", icon: "🌧️", label: "Heavy Rain", threshold: ">50mm/hr", defaultHours: 3 },
  { id: "aqi", icon: "🌫️", label: "Severe Pollution (AQI>300)", threshold: "AQI 318", defaultHours: 4 },
  { id: "heat", icon: "🥵", label: "Extreme Heat (>45°C)", threshold: "46.2°C", defaultHours: 5 },
  { id: "flood", icon: "🌊", label: "Flooding", threshold: "Zone Red Alert", defaultHours: 6 },
  { id: "curfew", icon: "🚫", label: "Curfew / Zone Closure", threshold: "Official Notice", defaultHours: 8 },
  { id: "outage", icon: "⚡", label: "Platform Outage", threshold: "App down 90min", defaultHours: 2 },
];

const HISTORY = [
  { id: "CLM-001", type: "🌧️ Heavy Rain", date: "Mar 10, 2025", hours: 4.5, amount: 675, status: "PAID", upi: "ravi@upi" },
  { id: "CLM-002", type: "🌫️ AQI Alert", date: "Mar 3, 2025", hours: 2, amount: 300, status: "PAID", upi: "ravi@upi" },
  { id: "CLM-003", type: "🚫 Curfew", date: "Feb 24, 2025", hours: 5, amount: 900, status: "PAID", upi: "ravi@upi" },
];

const PAYOUT_RATE = { rain: 150, aqi: 120, heat: 100, flood: 200, curfew: 180, outage: 130 };

export default function Claims({ worker }) {
  const [step, setStep] = useState("list"); // list | new | processing | done
  const [selectedType, setSelectedType] = useState(null);
  const [hours, setHours] = useState(3);
  const [upi, setUpi] = useState("");
  const [claimId, setClaimId] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);

  const startClaim = () => setStep("new");

  const submitClaim = () => {
    const rate = PAYOUT_RATE[selectedType?.id] || 150;
    const amount = Math.min(rate * hours, worker?.plan?.coverage || 1500);
    setPaidAmount(amount);
    setClaimId("CLM-" + Math.floor(Math.random() * 9000 + 1000));
    setStep("processing");
    setTimeout(() => setStep("done"), 3200);
  };

  if (step === "processing") return (
    <div style={{ maxWidth: 480, margin: "80px auto", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ width: 72, height: 72, border: "4px solid var(--bg3)", borderTop: "4px solid var(--accent)", borderRadius: "50%", animation: "spin 0.9s linear infinite", margin: "0 auto 28px" }} />
      <h2 style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800, marginBottom: 10 }}>Processing Your Claim</h2>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>AI is verifying disruption data from APIs...</p>
      {["✓ Disruption verified via weather API", "✓ Location validated via GPS logs", "✓ Fraud check — passed", "⟳ Initiating UPI payout..."].map((s, i) => (
        <div key={i} style={{ textAlign: "left", padding: "8px 16px", marginBottom: 8, background: "var(--card)", borderRadius: 10, fontSize: "13px", color: i < 3 ? "var(--accent)" : "var(--muted)", border: "1px solid var(--border)" }}>{s}</div>
      ))}
    </div>
  );

  if (step === "done") return (
    <div style={{ maxWidth: 480, margin: "80px auto", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,229,160,0.15)", border: "2px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", margin: "0 auto 24px" }}>✓</div>
      <h2 style={{ fontFamily: "var(--font-head)", fontSize: "28px", fontWeight: 800, marginBottom: 8 }}>Claim Approved!</h2>
      <p style={{ color: "var(--muted)", marginBottom: 28 }}>Payout sent to your UPI instantly.</p>
      <div className="card" style={{ marginBottom: 24, textAlign: "left" }}>
        {[
          { label: "Claim ID", val: claimId },
          { label: "Disruption", val: selectedType?.label },
          { label: "Hours Claimed", val: `${hours} hours` },
          { label: "Payout Amount", val: `₹${paidAmount}` },
          { label: "UPI ID", val: upi || worker?.phone || "ravi@upi" },
          { label: "Status", val: "✅ PAID" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < 5 ? "1px solid var(--border)" : "none" }}>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>{r.label}</span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: r.label === "Payout Amount" ? "var(--accent)" : "var(--text)" }}>{r.val}</span>
          </div>
        ))}
      </div>
      <button className="btn-primary" style={{ width: "100%" }} onClick={() => setStep("list")}>
        ← Back to Claims
      </button>
    </div>
  );

  if (step === "new") return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 24px" }}>
      <h2 style={{ fontFamily: "var(--font-head)", fontSize: "26px", fontWeight: 800, marginBottom: 8 }}>File a Claim</h2>
      <p style={{ color: "var(--muted)", marginBottom: 28 }}>Select the disruption that stopped you from working.</p>

      <div style={{ marginBottom: 24 }}>
        <label>Disruption Type</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
          {DISRUPTION_TYPES.map(d => (
            <button key={d.id} onClick={() => { setSelectedType(d); setHours(d.defaultHours); }} style={{
              padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${selectedType?.id === d.id ? "var(--accent)" : "var(--border)"}`,
              background: selectedType?.id === d.id ? "rgba(0,229,160,0.08)" : "var(--card)",
              cursor: "pointer", textAlign: "left", transition: "all 0.2s"
            }}>
              <span style={{ fontSize: "20px" }}>{d.icon}</span>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--text)", marginTop: 4 }}>{d.label}</p>
              <p style={{ fontSize: "10px", color: "var(--muted)" }}>Live: {d.threshold}</p>
            </button>
          ))}
        </div>
      </div>

      {selectedType && (
        <>
          <div style={{ marginBottom: 16 }}>
            <label>Hours Unable to Work</label>
            <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(h => (
                <button key={h} onClick={() => setHours(h)} style={{
                  width: 44, height: 44, borderRadius: 10, border: `1.5px solid ${hours === h ? "var(--accent)" : "var(--border)"}`,
                  background: hours === h ? "rgba(0,229,160,0.12)" : "var(--bg3)", color: hours === h ? "var(--accent)" : "var(--text)",
                  cursor: "pointer", fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "15px"
                }}>{h}</button>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 20, background: "rgba(0,229,160,0.06)", borderColor: "rgba(0,229,160,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--muted)", fontSize: "13px" }}>Estimated Payout</span>
              <span style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800, color: "var(--accent)" }}>
                ₹{Math.min(PAYOUT_RATE[selectedType.id] * hours, worker?.plan?.coverage || 1500)}
              </span>
            </div>
            <p style={{ fontSize: "11px", color: "var(--muted)", marginTop: 4 }}>₹{PAYOUT_RATE[selectedType.id]}/hr × {hours}hrs (capped at plan max)</p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label>UPI ID for Payout</label>
            <input placeholder="yourname@upi" value={upi} onChange={e => setUpi(e.target.value)} style={{ marginTop: 8 }} />
          </div>
        </>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn-secondary" onClick={() => setStep("list")}>← Cancel</button>
        <button className="btn-primary" style={{ flex: 1 }} onClick={submitClaim} disabled={!selectedType}>
          Submit Claim →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-head)", fontSize: "28px", fontWeight: 800, marginBottom: 4 }}>Claims</h1>
          <p style={{ color: "var(--muted)" }}>Parametric claims auto-triggered or filed manually.</p>
        </div>
        <button className="btn-primary" onClick={startClaim}>+ New Claim</button>
      </div>

      {/* Auto-trigger banner */}
      <div style={{
        background: "rgba(255,71,87,0.08)", border: "1px solid rgba(255,71,87,0.25)", borderRadius: 14,
        padding: "16px 20px", display: "flex", gap: 14, alignItems: "center", marginBottom: 24
      }}>
        <span style={{ fontSize: "24px" }}>🌧️</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: "14px", marginBottom: 2 }}>Auto-trigger Active: Heavy Rain detected in your zone</p>
          <p style={{ fontSize: "12px", color: "var(--muted)" }}>Rainfall 63mm/hr — threshold exceeded. Claim will auto-initiate if you mark yourself offline.</p>
        </div>
        <button className="btn-primary" style={{ fontSize: "13px", padding: "9px 18px", background: "var(--red)" }} onClick={startClaim}>
          Claim Now
        </button>
      </div>

      {/* Claims history */}
      <div className="card">
        <p style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700, marginBottom: 16 }}>Claim History</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {HISTORY.map((c, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 16, alignItems: "center", padding: "14px 16px", background: "var(--bg3)", borderRadius: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>{c.type.split(" ")[0]}</div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600 }}>{c.type.substring(2)}</p>
                <p style={{ fontSize: "12px", color: "var(--muted)" }}>{c.date} · {c.hours}hrs · {c.id}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "var(--font-head)", fontSize: "18px", fontWeight: 800, color: "var(--accent)" }}>+₹{c.amount}</p>
                <p style={{ fontSize: "11px", color: "var(--muted)" }}>→ {c.upi}</p>
              </div>
              <div style={{ background: "rgba(0,229,160,0.1)", color: "var(--accent)", borderRadius: 50, padding: "3px 10px", fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-head)" }}>{c.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
