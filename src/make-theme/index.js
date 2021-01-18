import { collectAllSettings } from "./collectStyles";

export const makeTheme = (theme) => {
  const prismTheme = collectAllSettings(theme.tokenColors);
  const json = {
    plain: {
      color:
        theme.colors["editor.foreground"] ||
        theme.tokenColors.find((token) => token.scope === "support").settings
          .foreground,
      backgroundColor: theme.colors["editor.background"],
    },
    ...prismTheme,
  };

  return json;
};
