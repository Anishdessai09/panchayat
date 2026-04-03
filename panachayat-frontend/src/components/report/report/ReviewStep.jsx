import StatusBadge from "../StatusBadge";
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

export default function ReviewStep({ data, photoPreview }) {
  return (
    <div className="flex-1 px-6">
      <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Review & Submit</h2>
      <p className="text-sm text-muted-foreground font-body mb-6">
        Double-check everything looks right before sending.
      </p>

      <div className="rounded-2xl border border-border bg-secondary/30 overflow-hidden">
        {photoPreview && (
          <img src={photoPreview} alt="" className="w-full h-44 object-cover" />
        )}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-foreground text-lg">
              {data.title || CATEGORY_LABELS[data.category] || "Report"}
            </h3>
            <StatusBadge status="red" />
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-body">
            <MapPin className="w-4 h-4" />
            {data.village || "Location pending"}
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-heading font-semibold">
            {CATEGORY_LABELS[data.category] || data.category}
          </div>

          {data.description && (
            <p className="text-sm text-muted-foreground font-body">{data.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}