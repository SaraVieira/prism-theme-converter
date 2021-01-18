import React from "react";
import "styled-components/macro";
import useClipboard from "react-use-clipboard";
import { template } from "./make-theme/template";
import { toSyntaxHighlighter } from "./make-theme/highlighterTheme";
import Highlight, { defaultProps } from "prism-react-renderer";
import { ACTIVE_TAB, RESULT_CODE, GET_THEME, BUTTON_STYLES } from "./constants";
import { Code, Wrapper } from "./elements";

export default ({ theme, code, language = "json", setTab, tab, error }) => {
  const getCode = () => {
    if (!theme) return null;
    if (error) {
      return theme;
    }

    if (tab === "prism") return template(theme);
    if (tab === "react") return theme;
    if (tab === "highlighter")
      return `export default ${JSON.stringify(
        toSyntaxHighlighter(template(theme)),
        null,
        4
      )}`;
  };

  const ResultCode = RESULT_CODE(theme, getCode(code), tab);
  const [isCopied, setCopied] = useClipboard(ResultCode, {
    successDuration: 1000,
  });

  return (
    <Wrapper>
      <div>
        <div className="sm:hidden">
          <select className="form-select block w-full">
            <option selected>Prism</option>
            <option>Prims React Renderer</option>
            <option>React Syntax Highlighter</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setTab("prism")}
                className={ACTIVE_TAB(tab === "prism")}
              >
                Prism
              </button>
              <button
                onClick={() => setTab("react")}
                className={ACTIVE_TAB(tab === "react")}
              >
                Prism React Renderer
              </button>
              <button
                onClick={() => setTab("highlighter")}
                className={ACTIVE_TAB(tab === "highlighter")}
              >
                React Syntax Highlighter
              </button>
            </nav>
          </div>
        </div>
      </div>
      <Highlight
        {...defaultProps}
        theme={GET_THEME(theme)}
        code={ResultCode}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Code className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Code>
        )}
      </Highlight>
      <button
        type="button"
        css={`
          position: absolute;
          bottom: 90px;
          right: 20px;
        `}
        className={BUTTON_STYLES}
        onClick={setCopied}
      >
        {isCopied ? "Copied" : "Copy"} to Clipboard
      </button>
    </Wrapper>
  );
};
