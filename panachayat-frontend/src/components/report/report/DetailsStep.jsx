import { MapPin, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function DetailsStep({ data, onChange }) {
  const [locating, setLocating] = useState(false);

  function getLocation() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true }
    );
  }

  return (
    <div className="flex-1 px-6 space-y-5">
      <div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Add Details</h2>
        <p className="text-sm text-muted-foreground font-body">
          A short title and your location help us send help faster.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-heading font-semibold text-muted-foreground mb-1.5 block">
            HEADLINE
          </label>
          <Input
            placeholder="e.g. Broken Pipe near Market"
            value={data.title || ""}
            onChange={(e) => onChange({ title: e.target.value })}
            className="h-12 text-base font-body bg-secondary/40 border-border"
          />
        </div>

        <div>
          <label className="text-xs font-heading font-semibold text-muted-foreground mb-1.5 block">
            VILLAGE / LOCALITY
          </label>
          <Input
            placeholder="e.g. Saligao"
            value={data.village || ""}
            onChange={(e) => onChange({ village: e.target.value })}
            className="h-12 text-base font-body bg-secondary/40 border-border"
          />
        </div>

        <div>
          <label className="text-xs font-heading font-semibold text-muted-foreground mb-1.5 block">
            DESCRIPTION (Optional)
          </label>
          <Textarea
            placeholder="Any extra details..."
            value={data.description || ""}
            onChange={(e) => onChange({ description: e.target.value })}
            className="text-base font-body bg-secondary/40 border-border min-h-[80px]"
          />
        </div>

        <div>
          <label className="text-xs font-heading font-semibold text-muted-foreground mb-1.5 block">
            LOCATION
          </label>
          {data.latitude && data.longitude ? (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/30">
              <MapPin className="w-5 h-5 text-green-400" />
              <span className="text-sm font-body text-green-400">
                Location captured ({data.latitude.toFixed(4)}, {data.longitude.toFixed(4)})
              </span>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={getLocation}
              disabled={locating}
              className="w-full h-12 font-heading border-border"
            >
              <Locate className="w-5 h-5 mr-2" />
              {locating ? "Getting location..." : "Use My Current Location"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}