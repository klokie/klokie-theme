import type { ThemePreset } from "./types.js";

const ekeCountry: ThemePreset = {
  name: "eke-country",
  label: "Eke Country",
  tokensCss: "@klokie/theme/tokens/eke-country.css",
  fonts: {
    googleFamilies: [
      "Bitter:ital,wght@0,400;0,600;0,700;1,400",
      "Inter:wght@400;500;600",
    ],
    displayStack: '"Bitter", "Zilla Slab", Georgia, serif',
    bodyStack:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  },
  meta: {
    accentMood: "barn-night-amber",
    locale: "sv-SE",
  },
};

export default ekeCountry;
