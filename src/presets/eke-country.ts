import type { ThemePreset } from "./types.js";

const ekeCountry: ThemePreset = {
  name: "eke-country",
  label: "Eke Country",
  tokensCss: "@klokie/theme/tokens/eke-country.css",
  fonts: {
    // Rye ships one weight only — no bold, no italic. That's normal for a
    // wood-type display face and fine for headlines; don't ask it for emphasis.
    googleFamilies: ["Rye", "Inter:wght@400;500;600"],
    displayStack: '"Rye", "Bitter", Georgia, serif',
    bodyStack:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  },
  meta: {
    accentMood: "barn-night-amber",
    locale: "sv-SE",
  },
};

export default ekeCountry;
