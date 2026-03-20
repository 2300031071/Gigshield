export default function Nav({ page, navigate, worker }) {
  const links = [
    { id: "dashboard", label: "Dashboard" },
    { id: "policy", label: "My Policy" },
    { id: "claims", label: "Claims" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(10,14,26,0.92)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", height: "64px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{
          width: 32, height: 32, borderRadius: "10px",
          background: "linear-gradient(135deg, var(--accent), #00b378)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px"
        }}>⚡</div>
        <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "18px" }}>
          Gig<span style={{ color: "var(--accent)" }}>Shield</span>
        </span>
      </div>

      <div style={{ display: "flex", gap: "4px" }}>
        {links.map(l => (
          <button key={l.id} onClick={() => navigate(l.id)}
            style={{
              background: page === l.id ? "rgba(0,229,160,0.12)" : "transparent",
              color: page === l.id ? "var(--accent)" : "var(--muted)",
              border: "none", borderRadius: "8px",
              padding: "8px 16px", cursor: "pointer",
              fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "14px",
              transition: "all 0.2s"
            }}>
            {l.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, #6C63FF, var(--accent))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", fontWeight: 700, fontFamily: "var(--font-head)"
        }}>
          {worker?.name?.[0] || "R"}
        </div>
        <span style={{ fontSize: "13px", color: "var(--muted)" }}>{worker?.name || "Ravi Kumar"}</span>
      </div>
    </nav>
  );
}
