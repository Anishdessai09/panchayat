import { ChevronUp, ChevronDown, Zap } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReportCard from "./ReportCard";
import { cn } from "@/lib/utils";

export default function ImpactTray({ reports, newReportId, onReportClick }) {
  const [expanded, setExpanded] = useState(true);
  const myReports = reports || [];

  return (
    <div className="relative">
      {/* Handle bar */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center py-2 group"
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 border border-border backdrop-blur-sm">
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-xs font-semibold font-heading text-foreground tracking-wide">
            MY IMPACT
          </span>
          <Zap className="w-3.5 h-3.5 text-neon-blue" />
          <span className="text-xs font-bold text-primary">{myReports.length}</span>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={cn(
              "px-4 pb-4 space-y-2 overflow-y-auto",
              myReports.length > 3 ? "max-h-[240px]" : ""
            )}>
              {myReports.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground text-sm font-body">
                    No reports yet. Tap + to file your first report.
                  </p>
                </div>
              ) : (
                myReports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    isNew={report.id === newReportId}
                    onClick={onReportClick}
                  />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}