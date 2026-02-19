import { useMemo } from "react";
import { buildTrackLines, buildStationsMap } from "@/lib/map-utils";
import { groupSignalsByELR } from "@/lib/signal-utils";
import type { Track } from "@/schemas/trackSchema";
import type { Signal } from "@/schemas/signalSchema";

export function useMapData(tracks: Track[], signals: Signal[]) {
  const trackLines = useMemo(() => buildTrackLines(tracks), [tracks]);

  const stationsWithSignals = useMemo(() => {
    const stationMap = buildStationsMap(tracks);
    return Array.from(stationMap.entries());
  }, [tracks]);

  const elrGroups = useMemo(() => groupSignalsByELR(signals), [signals]);

  const stats = useMemo(
    () => ({
      mappedTracks: trackLines.length,
      totalTracks: tracks.length,
      mappedStations: stationsWithSignals.length,
      totalElrGroups: elrGroups.length,
    }),
    [
      trackLines.length,
      tracks.length,
      stationsWithSignals.length,
      elrGroups.length,
    ],
  );

  return {
    trackLines,
    stationsWithSignals,
    elrGroups,
    stats,
  };
}
