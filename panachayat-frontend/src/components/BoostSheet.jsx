import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import { base44 } from "@/api/base44Client";

export default function BoostSheet({ report, userEmail, onClose, onBoosted }) {
  const [boosting, setBoosting] = useState(false);

  if (!report) return null;

  const alreadyBoosted = (report.boosted_by || []).includes(userEmail);
  const isYellow = report.status === "yellow";

  async function handleBoost() {
    setBoosting(true);
    const newBoosts = (report.community_boosts || 0) + 1;
    const newBoostedBy = [...(report.boosted_by || []), userEmail];
    await base44.entities.Report.update(report.id, {
      community_boosts: newBoosts,
      boosted_by: newBoostedBy,
    });
    onBoosted?.();
    setBoosting(false);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          exit={{ y: 300 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-lg bg-card border-t border-border rounded-t-2xl p-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-lg text-foreground">Report Details</h3>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {report.photo_url && (
            <img
              src={report.photo_url}
              alt=""
              className="w-full h-40 object-cover rounded-xl mb-4 border border-border"
            />
          )}

          <p className="font-heading font-semibold text-foreground">{report.title}</p>
          <p className="text-sm text-muted-foreground mt-1 font-body">{report.village}</p>
          <div className="mt-3">
            <StatusBadge status={report.status} />
          </div>

          {report.description && (
            <p className="text-sm text-muted-foreground mt-3 font-body">{report.description}</p>
          )}

          {isYellow && !alreadyBoosted && (
            <Button
              onClick={handleBoost}
              disabled={boosting}
              className="w-full mt-5 h-14 text-base font-heading font-bold bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              <Eye className="w-5 h-5 mr-2" />
              {boosting ? "Verifying..." : "I See Work Happening"}
            </Button>
          )}

          {isYellow && alreadyBoosted && (
            <div className="w-full mt-5 h-14 flex items-center justify-center gap-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <ThumbsUp className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400 font-heading">You verified this</span>
            </div>
          )}

          {report.community_boosts > 0 && (
            <p className="text-center text-xs text-muted-foreground mt-3 font-body">
              {report.community_boosts} community member{report.community_boosts > 1 ? "s" : ""} verified
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}