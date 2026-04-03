import { motion, AnimatePresence } from "framer-motion";

export default function SuccessOverlay({ visible, villageName, onDone }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0a0a0f", fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          onAnimationComplete={(def) => {
            if (def.opacity === 1) setTimeout(() => onDone?.(), 1800);
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,188,212,0.08)", border: "1px solid rgba(0,188,212,0.2)", boxShadow: "0 0 40px rgba(0,188,212,0.2)" }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "rgba(34,197,94,0.1)", boxShadow: "0 0 20px rgba(34,197,94,0.3)" }}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M14 24L21 31L34 18" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="check-animate" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-8 text-2xl font-black text-white tracking-wider"
          >
            REPORT LIVE!
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="mt-2 text-sm text-gray-400 text-center px-8"
          >
            You've updated the{" "}
            <span style={{ color: "#00bcd4" }}>{villageName || "village"}</span> map.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}