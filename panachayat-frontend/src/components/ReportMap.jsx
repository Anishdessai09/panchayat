import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DOT_COLORS = {
  red: { bg: "#ef4444", shadow: "rgba(239,68,68,0.6)" },
  yellow: { bg: "#eab308", shadow: "rgba(234,179,8,0.6)" },
  green: { bg: "#22c55e", shadow: "rgba(34,197,94,0.6)" },
};

function createDotIcon(status, isNew) {
  const c = DOT_COLORS[status] || DOT_COLORS.red;
  const size = isNew ? 20 : 14;
  const pulseClass = `pulse-${status}`;
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<div class="${pulseClass}" style="width:${size}px;height:${size}px;border-radius:50%;background:${c.bg};box-shadow:0 0 12px 3px ${c.shadow};"></div>`,
  });
}

function MapMarkers({ reports, focusReportId, onMarkerClick }) {
  const map = useMap();
  const markersRef = useRef([]);

  useEffect(() => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    reports.forEach((r) => {
      if (!r.latitude || !r.longitude) return;
      const isNew = r.id === focusReportId;
      const icon = createDotIcon(r.status || "red", isNew);
      const marker = L.marker([r.latitude, r.longitude], { icon })
        .addTo(map)
        .on("click", () => onMarkerClick?.(r));

      marker.bindTooltip(
        `<div style="font-family:'Space Grotesk',sans-serif;font-size:12px;font-weight:600;">${r.title || "Report"}</div><div style="font-size:10px;color:#999;">${r.village || ""}</div>`,
        { className: "custom-tooltip", direction: "top", offset: [0, -10] }
      );

      markersRef.current.push(marker);
    });
  }, [reports, focusReportId, map, onMarkerClick]);

  useEffect(() => {
    if (focusReportId) {
      const r = reports.find((rep) => rep.id === focusReportId);
      if (r?.latitude && r?.longitude) {
        map.flyTo([r.latitude, r.longitude], 15, { duration: 1.2 });
      }
    }
  }, [focusReportId, reports, map]);

  return null;
}

export default function ReportMap({ reports, focusReportId, onMarkerClick, className, style }) {
  const defaultCenter = [15.4, 73.95];

  return (
    <div className={className} style={style}>
      <MapContainer
        center={defaultCenter}
        zoom={12}
        style={{ width: "100%", height: style?.height || "240px" }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />
        <MapMarkers
          reports={reports}
          focusReportId={focusReportId}
          onMarkerClick={onMarkerClick}
        />
      </MapContainer>
    </div>
  );
}