import { getStationCoords } from "@/lib/station-coords";
import type { Track } from "@/schemas/trackSchema";

export interface TrackLine {
  id: number;
  positions: [number, number][];
  source: string;
  target: string;
  signalCount: number;
}

export interface StationData {
  coords: [number, number];
  count: number;
}

export function buildTrackLines(tracks: Track[]): TrackLine[] {
  return tracks
    .map((track) => {
      const sourceCoords = getStationCoords(track.source);
      const targetCoords = getStationCoords(track.target);

      if (sourceCoords && targetCoords) {
        return {
          id: track.track_id,
          positions: [sourceCoords, targetCoords],
          source: track.source,
          target: track.target,
          signalCount: track.signal_ids.length,
        };
      }
      return null;
    })
    .filter((line): line is TrackLine => line !== null);
}

export function buildStationsMap(tracks: Track[]): Map<string, StationData> {
  const stationMap = new Map<string, StationData>();

  tracks.forEach((track) => {
    const sourceCoords = getStationCoords(track.source);
    const targetCoords = getStationCoords(track.target);

    if (sourceCoords) {
      const current = stationMap.get(track.source);
      stationMap.set(track.source, {
        coords: sourceCoords,
        count: (current?.count || 0) + track.signal_ids.length,
      });
    }

    if (targetCoords) {
      const current = stationMap.get(track.target);
      stationMap.set(track.target, {
        coords: targetCoords,
        count: (current?.count || 0) + track.signal_ids.length,
      });
    }
  });

  return stationMap;
}
