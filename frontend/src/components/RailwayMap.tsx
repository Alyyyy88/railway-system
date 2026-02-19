import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useTracks, useSignals } from "@/hooks";
import { useMapData } from "@/hooks/useMapData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorAlert } from "@/components/ui/error-alert";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { StatCard } from "@/components/map/StatCard";
import { MapView } from "@/components/map/MapView";
import { ELRGroupsDisplay } from "@/components/map/ELRGroupsDisplay";
import { configureLeafletIcons } from "@/lib/leaflet-config";

export function RailwayMap() {
  // Configure Leaflet icons once on mount
  useEffect(() => {
    configureLeafletIcons();
  }, []);

  const {
    data: tracksData,
    isLoading: tracksLoading,
    error: tracksError,
  } = useTracks({ limit: 100 });
  const {
    data: signalsData,
    isLoading: signalsLoading,
    error: signalsError,
  } = useSignals({ limit: 100 });

  const tracks = tracksData?.data || [];
  const signals = signalsData?.data || [];

  const { trackLines, stationsWithSignals, elrGroups, stats } = useMapData(
    tracks,
    signals,
  );

  if (tracksError) {
    return <ErrorAlert error={tracksError} />;
  }

  if (signalsError) {
    return <ErrorAlert error={signalsError} />;
  }

  if (tracksLoading || signalsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Railway Map</CardTitle>
        </CardHeader>
        <CardContent>
          <TableSkeleton rows={3} />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Tracks Visualized"
          value={`${stats.mappedTracks} / ${stats.totalTracks}`}
          description={`${((stats.mappedTracks / stats.totalTracks) * 100).toFixed(0)}% mapped`}
        />
        <StatCard
          title="Stations"
          value={stats.mappedStations}
          description="London railway stations"
        />
        <StatCard
          title="ELR Groups"
          value={stats.totalElrGroups}
          description="Railway line references"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Railway Network Map</CardTitle>
          <CardDescription>
            Interactive visualization of {signals.length} signals across{" "}
            {tracks.length} tracks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MapView trackLines={trackLines} stations={stationsWithSignals} />
          <ELRGroupsDisplay elrGroups={elrGroups} />
        </CardContent>
      </Card>
    </div>
  );
}
