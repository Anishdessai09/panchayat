import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { MapPin, Loader2 } from "lucide-react";

export default function OnboardingScreen({ onComplete }) {
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [saving, setSaving] = useState(false);

  function autoDetect() {
    navigator.geolocation?.getCurrentPosition(() => {
      setVillage("My Location");
    });
  }

  async function handleEnter() {
    if (!phone || !village) return;
    setSaving(true);
    await base44.auth.updateMe({ phone, village });
    setSaving(false);
    onComplete();
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6"
      style={{ background: "#0a0a0f", fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
    >
      {/* Logo */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "linear-gradient(135deg, #0d2030, #0a3040)", border: "1.5px solid #1a4a5a", boxShadow: "0 0 24px rgba(0,188,212,0.25)" }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>

      <h1 className="text-3xl font-black tracking-widest text-white mb-1">PANCHAYAT</h1>
      <p className="text-[10px] font-bold tracking-[0.3em] text-gray-500 mb-8">CIVIC INTELLIGENCE PLATFORM</p>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl p-6"
        style={{ background: "#0f0f17", border: "1px solid #1a2a3a" }}
      >
        <h2 className="text-lg font-bold text-white mb-1">Welcome</h2>
        <p className="text-sm text-gray-400 mb-6">Identify yourself to enter the Command Center</p>

        {/* Phone */}
        <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-1.5">MOBILE NUMBER</p>
        <div
          className="flex items-center gap-2 px-4 py-3.5 rounded-xl mb-4"
          style={{ background: "#141420", border: "1px solid #2a2a3a" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <input
            type="tel"
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-600 text-sm outline-none"
          />
        </div>

        {/* Village */}
        <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-1.5">PANCHAYAT / LOCATION</p>
        <div
          className="flex items-center gap-2 px-4 py-3.5 rounded-xl mb-2"
          style={{ background: "#141420", border: "1px solid #2a2a3a" }}
        >
          <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="e.g. Rampur Gram Panchayat"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-600 text-sm outline-none"
          />
        </div>

        <button onClick={autoDetect} className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "#00bcd4" }}>
          <MapPin className="w-3.5 h-3.5" />
          Auto-detect my location
        </button>

        {/* CTA */}
        <button
          onClick={handleEnter}
          disabled={!phone || !village || saving}
          className="w-full py-4 rounded-xl text-sm font-black tracking-widest transition-all"
          style={{
            border: "1.5px solid #00bcd4",
            color: phone && village ? "#00bcd4" : "#2a5a6a",
            background: "transparent",
            opacity: phone && village ? 1 : 0.5,
          }}
        >
          {saving ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> ENTERING...
            </span>
          ) : (
            "ENTER PANCHAYAT →"
          )}
        </button>

        <p className="text-[10px] text-gray-600 text-center mt-4">
          Your data is stored locally and on-chain for transparency.
        </p>
      </div>
    </div>
  );
}