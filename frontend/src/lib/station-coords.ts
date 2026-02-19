/**
 * GPS coordinates [latitude, longitude] for London railway stations
 *
 * NOTE: These are hardcoded for demonstration purposes.
 *
 * Format: [latitude, longitude] in decimal degrees (WGS84)
 */
export const LONDON_STATION_COORDS: Record<string, [number, number]> = {
  "London Victoria": [51.4952, -0.1441],
  "London Bridge": [51.5048, -0.0863],
  "London St. Pancras International": [51.5308, -0.1261],
  "London Liverpool Street": [51.5179, -0.0823],
  "London Euston": [51.5282, -0.1337],
  "Clapham Junction": [51.4642, -0.1701],
  "Battersea Park": [51.481, -0.1546],
  Vauxhall: [51.4861, -0.1253],
  "Queenstown Road": [51.4744, -0.1758],
  "Acton Central": [51.5083, -0.263],
  "Wembley Central": [51.552, -0.296],
  "Willesden Junction": [51.5324, -0.2446],
  "Finsbury Park": [51.564, -0.1063],
  "Kentish Town": [51.5501, -0.1417],
  "South Hampstead": [51.5414, -0.1795],
  Whitechapel: [51.5195, -0.0601],
  "Shoreditch High Street": [51.5224, -0.0752],
  "Hackney Downs": [51.5449, -0.0579],
  "Bethnal Green": [51.5265, -0.0557],
  "Imperial Wharf": [51.4762, -0.1774],
  "Wandsworth Road": [51.4701, -0.131],
  "Wandsworth Common": [51.4493, -0.1592],
  Canonbury: [51.5482, -0.09],
  Deptford: [51.4783, -0.0297],
  "Brent Cross West": [51.5693, -0.2231],
};

export function getStationCoords(stationName: string): [number, number] | null {
  return LONDON_STATION_COORDS[stationName] || null;
}

export function getColorForELR(elr: string | null): string {
  if (!elr) return "#94a3b8";

  const colors = [
    "#ef4444",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f97316",
    "#06b6d4",
    "#6366f1",
  ];

  let hash = 0;
  for (let i = 0; i < elr.length; i++) {
    hash = elr.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}
