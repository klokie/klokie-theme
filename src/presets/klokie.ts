import type { ThemePreset } from "./types.js";

const klokie: ThemePreset = {
  name: "klokie",
  label: "Klokie",
  tokensCss: "@klokie/theme/tokens/klokie.css",
  fonts: {
    googleFamilies: [
      "Jost:wght@300;400;500;600;700",
      "Fira+Code:wght@400;500",
    ],
    displayStack: '"Futura Std", Jost, "Century Gothic", sans-serif',
    bodyStack: '"Futura Std", Jost, "Century Gothic", sans-serif',
  },
  meta: {
    accentMood: "neon-orange",
    locale: "en",
  },
};

export default klokie;
