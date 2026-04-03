import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SuccessOverlay from "../components/SuccessOverlay";
import { base44 } from "@/api/base44Client";

const CATEGORIES = [
  { id: "waste", label: "Waste", emoji: "🗑️" },
  { id: "noise", label: "Noise", emoji: "🔇" },
  { id: "congestion", label: "Congestion", emoji: "🚗" },
  { id: "infrastructure", label: "Infrastructure", emoji: "🏗️" },
  { id: "water", label: "Water", emoji: "💧" },
  { id: "safety", label: "Safety", emoji: "⚠️" },
  { id: "other", label: "Other", emoji: "❓" },
];

function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-0">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
            style={{
              background: i < current ? "#00bcd4" : i === current ? "#00bcd4" : "#1a1a2e",
              border: i <= current ? "none" : "2px solid #2a2a4a",
              color: i <= current ? "#000" : "#666",
              boxShadow: i === current ? "0 0 12px rgba(0,188,212,0.5)" : "none",
            }}
          >
            {i < current ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div className="w-16 h-0.5 mx-1" style={{ background: i < current ? "#00bcd4" : "#1a1a2e" }} />
          )}
        </div>
      ))}
    </div>
  );
}

// Step 1
function CaptureStep({ photoFile, photoPreview, onFile, onSkip }) {
  const inputRef = { current: null };
  function handleFile(e) {
    const file = e.target.files?.[0];
    if (file) onFile(file, URL.createObjectURL(file));
  }
  return (
    <div className="flex-1 flex flex-col px-5">
      <h2 className="text-xl font-bold text-white mb-1">Capture Evidence</h2>
      <p className="text-sm text-gray-400 mb-5">Take a photo of the civic issue you want to report.</p>

      {photoPreview ? (
        <div className="relative w-full rounded-2xl overflow-hidden mb-4" style={{ border: "1px solid #1a3a4a" }}>
          <img src={photoPreview} alt="Preview" className="w-full h-56 object-cover" />
        </div>
      ) : (
        <div
          className="w-full h-52 rounded-2xl flex flex-col items-center justify-center mb-4"
          style={{ background: "#0d1a24", border: "1px solid #1a3a4a" }}
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <button
            onClick={() => document.getElementById("photo-input").click()}
            className="px-5 py-2 rounded-xl text-sm font-bold text-cyan-400"
            style={{ border: "1.5px solid #00bcd4" }}
          >
            Start Camera
          </button>
        </div>
      )}

      <input id="photo-input" type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />

      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => document.getElementById("photo-input").click()}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-gray-300"
          style={{ background: "#141420", border: "1px solid #2a2a3a" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          Upload Photo
        </button>
        <button
          onClick={onSkip}
          className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-gray-300"
          style={{ background: "#141420", border: "1px solid #2a2a3a" }}
        >
          Skip Photo
        </button>
      </div>
    </div>
  );
}

// Step 2
function DetailsStep({ data, onChange }) {
  function getLocation() {
    navigator.geolocation?.getCurrentPosition((pos) => {
      onChange({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    });
  }

  return (
    <div className="flex-1 flex flex-col px-5 overflow-y-auto">
      <h2 className="text-xl font-bold text-white mb-1">Issue Details</h2>
      <p className="text-sm text-cyan-400 mb-5">Help us improve civic experience in your area.</p>

      <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-2">ISSUE TYPE *</p>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange({ category: cat.id })}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all"
            style={{
              background: data.category === cat.id ? "#0d2a3a" : "#141420",
              border: data.category === cat.id ? "1.5px solid #00bcd4" : "1px solid #2a2a3a",
              boxShadow: data.category === cat.id ? "0 0 10px rgba(0,188,212,0.2)" : "none",
            }}
          >
            <span className="text-2xl">{cat.emoji}</span>
            <span className="text-[10px] text-gray-300 font-medium leading-tight text-center">{cat.label}</span>
          </button>
        ))}
      </div>

      <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-1.5">TITLE *</p>
      <input
        type="text"
        placeholder="Brief description of the issue"
        value={data.title || ""}
        onChange={(e) => onChange({ title: e.target.value })}
        className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 mb-4 outline-none"
        style={{ background: "#141420", border: "1px solid #2a2a3a" }}
      />

      <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-1.5">DESCRIPTION</p>
      <textarea
        placeholder="Provide more details..."
        value={data.description || ""}
        onChange={(e) => onChange({ description: e.target.value })}
        rows={3}
        className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 mb-4 outline-none resize-none"
        style={{ background: "#141420", border: "1px solid #2a2a3a" }}
      />

      <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-1.5">VILLAGE / LOCATION</p>
      <input
        type="text"
        placeholder="e.g. Saligao, Panjim"
        value={data.village || ""}
        onChange={(e) => onChange({ village: e.target.value })}
        className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 mb-2 outline-none"
        style={{ background: "#141420", border: "1px solid #2a2a3a" }}
      />

      {data.latitude ? (
        <p className="text-xs text-green-400 mb-4">📍 Location captured</p>
      ) : (
        <button onClick={getLocation} className="text-xs text-cyan-400 text-left mb-4">
          📍 Auto-detect my location
        </button>
      )}
    </div>
  );
}

// Step 3
function ReviewStep({ data, photoPreview }) {
  const cat = CATEGORIES.find((c) => c.id === data.category);
  return (
    <div className="flex-1 flex flex-col px-5">
      <h2 className="text-xl font-bold text-white mb-1">Review & Submit</h2>
      <p className="text-sm text-gray-400 mb-5">Confirm your report before sending.</p>

      <div className="rounded-2xl overflow-hidden" style={{ background: "#141420", border: "1px solid #2a2a3a" }}>
        {photoPreview && <img src={photoPreview} alt="" className="w-full h-44 object-cover" />}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            {cat && <span className="text-2xl">{cat.emoji}</span>}
            <div>
              <p className="font-bold text-white">{data.title || cat?.label || "Report"}</p>
              <p className="text-xs text-gray-400">{data.village || "No location"}</p>
            </div>
          </div>
          {data.description && <p className="text-sm text-gray-400">{data.description}</p>}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            AWAITING FIX
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [data, setData] = useState({
    title: "", category: "", description: "", village: "", latitude: null, longitude: null,
  });

  const urlParams = new URLSearchParams(window.location.search);
  const presetCategory = urlParams.get("category");
  if (presetCategory && !data.category) setData((d) => ({ ...d, category: presetCategory }));

  function update(updates) { setData((p) => ({ ...p, ...updates })); }

  function canNext() {
    if (step === 0) return true; // photo is optional (skip allowed)
    if (step === 1) return !!data.category && !!data.title && !!data.village;
    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    let file_url = "";
    if (photoFile) {
      const res = await base44.integrations.Core.UploadFile({ file: photoFile });
      file_url = res.file_url;
    }
    await base44.entities.Report.create({
      title: data.title || data.category,
      category: data.category,
      description: data.description,
      photo_url: file_url,
      latitude: data.latitude || 15.4,
      longitude: data.longitude || 73.95,
      village: data.village,
      status: "red",
      community_boosts: 0,
      boosted_by: [],
    });
    setSubmitting(false);
    setShowSuccess(true);
  }

  const STEP_TITLES = ["CAPTURE EVIDENCE", "ISSUE DETAILS", "REVIEW"];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0a0f", fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
      <SuccessOverlay visible={showSuccess} villageName={data.village} onDone={() => navigate("/?newReport=true")} />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: "#0f0f17", borderBottom: "1px solid #1a1a2e" }}>
        <button onClick={() => step > 0 ? setStep(step - 1) : navigate("/")} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#1a1a2e", border: "1px solid #2a2a4a" }}>
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <span className="text-sm font-black tracking-widest text-white">{STEP_TITLES[step]}</span>
        <button onClick={() => navigate("/")} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#1a1a2e", border: "1px solid #2a2a4a" }}>
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Step indicator */}
      <div className="flex justify-start px-5 pt-5 pb-4">
        <StepIndicator current={step} total={3} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col pb-4">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="flex-1 flex flex-col">
            {step === 0 && (
              <CaptureStep
                photoFile={photoFile}
                photoPreview={photoPreview}
                onFile={(f, p) => { setPhotoFile(f); setPhotoPreview(p); }}
                onSkip={() => setStep(1)}
              />
            )}
            {step === 1 && <DetailsStep data={data} onChange={update} />}
            {step === 2 && <ReviewStep data={data} photoPreview={photoPreview} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 pb-6">
        {step < 2 ? (
          <button
            disabled={!canNext()}
            onClick={() => setStep(step + 1)}
            className="w-full py-4 rounded-xl text-sm font-black tracking-widest transition-all"
            style={{
              background: canNext() ? "transparent" : "transparent",
              border: `1.5px solid ${canNext() ? "#00bcd4" : "#2a2a3a"}`,
              color: canNext() ? "#00bcd4" : "#444",
            }}
          >
            CONTINUE →
          </button>
        ) : (
          <button
            disabled={submitting}
            onClick={handleSubmit}
            className="w-full py-4 rounded-xl text-sm font-black tracking-widest text-black transition-all"
            style={{ background: submitting ? "#0a6a7a" : "#00bcd4" }}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> SUBMITTING...
              </span>
            ) : "SUBMIT REPORT →"}
          </button>
        )}
      </div>
    </div>
  );
}