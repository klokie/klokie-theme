import type { ThemePreset } from "./types.js";

const jordsang: ThemePreset = {
  name: "jordsang",
  label: "Jordsång",
  tokensCss: "@klokie/theme/tokens/jordsang.css",
  fonts: {
    googleFamilies: [
      "Instrument+Serif:ital@0;1",
      "DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400",
    ],
    displayStack: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
    bodyStack: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  },
  meta: {
    accentMood: "warm-earth",
    locale: "sv-SE",
  },
};

export default jordsang;
