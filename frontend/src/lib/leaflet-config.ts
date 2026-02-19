import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

/**
 * Configure Leaflet marker icons for Vite/Webpack bundlers
 *
 * Leaflet tries to auto-detect icon paths at runtime, which fails with bundlers.
 * This explicitly sets the icon paths using local assets instead of CDN.
 */
export function configureLeafletIcons() {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
}
