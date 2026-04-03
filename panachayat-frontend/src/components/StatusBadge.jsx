import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  red: {
    label: "AWAITING FIX",
    dotClass: "bg-red-500",
    textClass: "text-red-400",
    bgClass: "bg-red-500/10",
    borderClass: "border-red-500/30",
  },
  yellow: {
    label: "WORKERS ON SITE",
    dotClass: "bg-yellow-500",
    textClass: "text-yellow-400",
    bgClass: "bg-yellow-500/10",
    borderClass: "border-yellow-500/30",
  },
  green: {
    label: "RESOLVED",
    dotClass: "bg-green-500",
    textClass: "text-green-400",
    bgClass: "bg-green-500/10",
    borderClass: "border-green-500/30",
  },
};

export default function StatusBadge({ status = "red", className }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.red;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-body tracking-wide border",
        config.bgClass,
        config.textClass,
        config.borderClass,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dotClass)} />
      {config.label}
    </span>
  );
}