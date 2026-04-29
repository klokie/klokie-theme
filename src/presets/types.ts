export interface ThemePreset {
  name: string;
  label: string;
  tokensCss: string;
  fonts: {
    googleFamilies?: string[];
    displayStack: string;
    bodyStack: string;
  };
  meta?: {
    accentMood?: string;
    locale?: string;
  };
}
