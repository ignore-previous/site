// Colour tokens, copied from src/assets/site.css (light block and the dark block). One source for the
// templates (as CSS variables) and for contrast.mjs (as numbers).
export const themes = {
  light: {
    bg: "#f1f3f7", surface: "#ffffff", ink: "#14161c", mute: "#4f5563",
    accent: "#ffcf1f", accentInk: "#14161c", line: "#14161c", shade: "#d3d8e2",
    term: "#14161c", termFg: "#f1f2f5", termMute: "#a9afbd",
  },
  dark: {
    bg: "#14161c", surface: "#1d2028", ink: "#f1f2f5", mute: "#a9afbd",
    accent: "#ffcf1f", accentInk: "#14161c", line: "#4b5263", shade: "#0a0b0e",
    term: "#0b0c10", termFg: "#f1f2f5", termMute: "#a9afbd",
  },
};

export const tokensCss = () =>
  Object.entries(themes)
    .map(([name, t]) => `body[data-theme="${name}"] { ${Object.entries(t).map(([k, v]) => `--${k}: ${v};`).join(" ")} }`)
    .join("\n");
