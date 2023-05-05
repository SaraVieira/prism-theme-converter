export const template = (theme) => `code[class*="language-"],
pre[class*="language-"] {
  color: ${
    theme.plain.color ||
    theme.styles.find((style) => style.types.includes("punctuation")).style
      .color
  };
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

pre[class*="language-"]::-moz-selection,
pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection,
code[class*="language-"] ::-moz-selection {
  text-shadow: none;
  background: ${theme.plain.selectionBackground};
}

pre[class*="language-"]::selection,
pre[class*="language-"] ::selection,
code[class*="language-"]::selection,
code[class*="language-"] ::selection {
  text-shadow: none;
  background: ${theme.plain.selectionBackground};
}

@media print {
  code[class*="language-"],
  pre[class*="language-"] {
    text-shadow: none;
  }
}

/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  color: white;
  background: ${theme.plain.backgroundColor};
}

:not(pre) > code[class*="language-"] {
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
}

${theme.styles
  .map((style) =>
    style.types
      .map(
        (type) => `
.token.${type} {
  color: ${style.style.color};
  ${style.style.fontStyle ? `font-style: ${style.style.fontStyle}` : ""}
}
`
      )
      .join("")
  )
  .join("")}
.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}
`;
