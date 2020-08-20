import React from "react";
import "styled-components/macro";
import Highlight, { defaultProps } from "prism-react-renderer";
import { ACTIVE_TAB, RESULT_CODE, GET_THEME } from "./constants";
import { Code, Wrapper } from "./elements";

export default ({ theme, code, language = "json", setTab, tab }) => {
  return (
    <Wrapper>
      <div>
        <div className="sm:hidden">
          <select className="form-select block w-full">
            <option selected>Prism Theme</option>
            <option>Prims React Renderer Theme</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setTab("prism")}
                className={ACTIVE_TAB(tab === "prism")}
              >
                Prism Theme
              </button>
              <button
                onClick={() => setTab("react")}
                className={ACTIVE_TAB(tab === "react")}
              >
                Prism React Renderer Theme
              </button>
            </nav>
          </div>
        </div>
      </div>
      <Highlight
        {...defaultProps}
        theme={GET_THEME(theme)}
        code={RESULT_CODE(theme, code, tab)}
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
        className="inline-flex items-center px-4 py-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
        onClick={() => {}}
      >
        Copy to Clipboard
      </button>
    </Wrapper>
  );
};
