import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { Badge } from "@/components/ui/badge";
import type { TrackLine, StationData } from "@/lib/map-utils";

interface MapViewProps {
  trackLines: TrackLine[];
  stations: [string, StationData][];
}

const LONDON_CENTER: [number, number] = [51.5074, -0.1278];
const DEFAULT_ZOOM = 11;
const TRACK_COLOR = "#3b82f6";

export function MapView({ trackLines, stations }: MapViewProps) {
  return (
    <div className="h-150 w-full rounded-md border overflow-hidden">
      <MapContainer
        center={LONDON_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {trackLines.map((line) => (
          <Polyline
            key={line.id}
            positions={line.positions}
            pathOptions={{ color: TRACK_COLOR, weight: 2, opacity: 0.6 }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">Track #{line.id}</p>
                <p>
                  <span className="text-muted-foreground">From:</span>{" "}
                  {line.source}
                </p>
                <p>
                  <span className="text-muted-foreground">To:</span>{" "}
                  {line.target}
                </p>
                <p className="mt-1">
                  <Badge variant="secondary">{line.signalCount} signals</Badge>
                </p>
              </div>
            </Popup>
          </Polyline>
        ))}

        {stations.map(([name, data]) => (
          <Marker key={name} position={data.coords}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{name}</p>
                <p className="text-muted-foreground">
                  {data.count} signal{data.count !== 1 ? "s" : ""} on connected
                  tracks
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
