import StatusBadge from "./StatusBadge";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

const CATEGORY_LABELS = {
  broken_pipe: "Broken Pipe",
  pothole: "Pothole",
  garbage_dump: "Garbage Dump",
  streetlight: "Streetlight",
  drainage: "Drainage",
  road_damage: "Road Damage",
  water_supply: "Water Supply",
  electricity: "Electricity",
  other: "Other",
};

export default function ReportCard({ report, isNew, onClick }) {
  return (
    <button
      onClick={() => onClick?.(report)}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-card/80 backdrop-blur-sm",
        "hover:bg-secondary/60 transition-all duration-300 text-left",
        isNew && "card-highlight"
      )}
    >
      {report.photo_url ? (
        <img
          src={report.photo_url}
          alt=""
          className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-border"
        />
      ) : (
        <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 border border-border">
          <MapPin className="w-6 h-6 text-muted-foreground" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold font-heading text-foreground truncate">
          {report.title || CATEGORY_LABELS[report.category] || "Report"}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {report.village || "Unknown Location"}
        </p>
      </div>

      <StatusBadge status={report.status} />
    </button>
  );
}