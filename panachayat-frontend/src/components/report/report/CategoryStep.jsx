import { cn } from "@/lib/utils";
import { Droplets, AlertTriangle, Trash2, Lightbulb, Waves, Construction, Zap, HelpCircle } from "lucide-react";

const CATEGORIES = [
  { id: "broken_pipe", label: "Broken Pipe", icon: Droplets },
  { id: "pothole", label: "Pothole", icon: AlertTriangle },
  { id: "garbage_dump", label: "Garbage Dump", icon: Trash2 },
  { id: "streetlight", label: "Streetlight", icon: Lightbulb },
  { id: "drainage", label: "Drainage", icon: Waves },
  { id: "road_damage", label: "Road Damage", icon: Construction },
  { id: "water_supply", label: "Water Supply", icon: Droplets },
  { id: "electricity", label: "Electricity", icon: Zap },
  { id: "other", label: "Other", icon: HelpCircle },
];

export default function CategoryStep({ selected, onSelect }) {
  return (
    <div className="flex-1 px-6">
      <h2 className="text-2xl font-heading font-bold text-foreground mb-2">What's the Issue?</h2>
      <p className="text-sm text-muted-foreground font-body mb-6">
        Select the category that best describes the problem.
      </p>

      <div className="grid grid-cols-3 gap-3">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                isSelected
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-secondary/40 border-border text-muted-foreground hover:border-primary/30"
              )}
            >
              <Icon className="w-7 h-7" />
              <span className="text-xs font-heading font-semibold text-center leading-tight">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}