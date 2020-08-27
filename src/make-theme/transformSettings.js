export const transformSettings = (settings) => {
  const output = {};

  if (settings.foreground) {
    output.color = settings.foreground.toString();
  }

  if (settings.background) {
    output.backgroundColor = settings.background.toString();
  }

  if (settings.fontStyle === "italic") {
    output.fontStyle = "italic";
  }

  return output;
};
