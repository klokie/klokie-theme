import type { ThemePreset } from "./types.js";

const ggm: ThemePreset = {
  name: "ggm",
  label: "Geek Girl Meetup",
  tokensCss: "@klokie/theme/tokens/ggm.css",
  fonts: {
    googleFamilies: ["Space+Grotesk:wght@500;700", "Inter:wght@400;500;600"],
    displayStack: '"Space Grotesk", "Helvetica Neue", Arial, sans-serif',
    bodyStack:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  },
  meta: {
    accentMood: "logo-cyan-on-white",
    locale: "en",
  },
};

export default ggm;
