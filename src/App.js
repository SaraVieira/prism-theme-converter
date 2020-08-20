import React, { useState, useRef } from "react";
import { makeTheme } from "./make-theme";
import decomment from "decomment";
import Code from "./Code";
import Logo from "./logo";
import "styled-components/macro";

import { InputArea, Main, Textarea } from "./elements";
import { template } from "./make-theme/template";
import { PLACEHOLDER, GET_THEME } from "./constants";

export default function App() {
  const texterea = useRef();
  const [tab, setTab] = useState("prism");
  const [theme, setTheme] = useState();
  const [vsCodeTheme, setVSCodeTheme] = useState("");

  const createPrismTheme = () => {
    let t = "";

    try {
      // eslint-disable-next-line
      t = eval("(" + decomment(vsCodeTheme) + ")");
    } catch (e) {
      return setTheme(`
    // not a valid VSCode Theme
  `);
    }
    if (!t || t.$schema !== "vscode://schemas/color-theme") {
      return setTheme(`
      // not a valid VSCode Theme
    `);
    } else {
      setTheme(makeTheme(t));
    }
  };

  return (
    <Main>
      <Logo theme={GET_THEME(theme)} />
      <InputArea>
        <div>
          <Textarea
            placeholder={PLACEHOLDER}
            value={vsCodeTheme}
            ref={texterea}
            onChange={(e) => {
              setVSCodeTheme(e.target.value);
              window.setTimeout(() => {
                texterea.current.scrollTo(0, 0);
              }, 0);
            }}
          />
          <button
            type="button"
            css={`
              position: fixed;
              bottom: 20px;
              left: calc(50% - 20px);
              transform: translateX(-100%);
            `}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
            onClick={createPrismTheme}
          >
            Create Prism Theme
          </button>
        </div>
        <Code
          language={tab === "prism" ? "css" : "json"}
          theme={theme}
          code={!theme ? null : tab === "prism" ? template(theme) : theme}
          tab={tab}
          setTab={setTab}
        />
      </InputArea>
    </Main>
  );
}
