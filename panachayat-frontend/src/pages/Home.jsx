import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";

export default function Home() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Report.list("-created_date", 200).then((data) => {
      setReports(data);
      setLoading(false);
    });
  }, []);

  const total = reports.length;
  const pending = reports.filter((r) => r.status === "red").length;
  const inProgress = reports.filter((r) => r.status === "yellow").length;
  const resolved = reports.filter((r) => r.status === "green").length;

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 32, height: 32, border: "4px solid #0e3a3a", borderTop: "4px solid #00bcd4", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "'Inter', sans-serif", color: "#fff" }}>

      {/* Header */}
      <div style={{ background: "#0f0f17", borderBottom: "1px solid #1a1a2e", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: "#00bcd4", fontWeight: 900, fontSize: 18, letterSpacing: 2 }}>PANCHAYAT</span>
        <span style={{ color: "#00bcd4", fontWeight: 700, fontSize: 14 }}>{total} issues</span>
      </div>

      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Report Card */}
        <div style={{ background: "#0f0f17", border: "1px solid #1a2a3a", borderRadius: 16, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Report an Issue</h2>
          <p style={{ color: "#888", fontSize: 14, marginBottom: 20 }}>
            Help fix civic problems in your area.
          </p>
          <button
            onClick={() => navigate("/report")}
            style={{ border: "1.5px solid #00bcd4", color: "#00bcd4", background: "transparent", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}
          >
            REPORT NEW ISSUE
          </button>
        </div>

        {/* Stats */}
        <div style={{ background: "#0f0f17", border: "1px solid #1a2a3a", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {[
              { label: "TOTAL", value: total, color: "#00bcd4" },
              { label: "PENDING", value: pending, color: "#ef4444" },
              { label: "IN PROGRESS", value: inProgress, color: "#eab308" },
              { label: "RESOLVED", value: resolved, color: "#22c55e" },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "20px 0",
                  textAlign: "center",
                  borderRight: i % 2 === 0 ? "1px solid #1a2a3a" : "none",
                  borderBottom: i < 2 ? "1px solid #1a2a3a" : "none",
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "#555", fontWeight: 700, letterSpacing: 2, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}