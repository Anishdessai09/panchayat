import { Camera, ImagePlus } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function PhotoStep({ photoPreview, onPhotoSelect }) {
  const inputRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoSelect(file, URL.createObjectURL(file));
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6">
      <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Snap the Issue</h2>
      <p className="text-sm text-muted-foreground font-body mb-8 text-center">
        Take a photo or pick from your gallery. This helps workers find the exact problem.
      </p>

      {photoPreview ? (
        <div className="relative w-full max-w-xs">
          <img
            src={photoPreview}
            alt="Preview"
            className="w-full h-56 object-cover rounded-2xl border-2 border-primary/30"
          />
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-3 right-3 font-heading"
            onClick={() => inputRef.current?.click()}
          >
            <Camera className="w-4 h-4 mr-1" /> Retake
          </Button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full max-w-xs h-56 rounded-2xl border-2 border-dashed border-border bg-secondary/40 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <ImagePlus className="w-8 h-8 text-primary" />
          </div>
          <span className="text-sm font-heading font-semibold text-muted-foreground">
            Tap to add photo
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}