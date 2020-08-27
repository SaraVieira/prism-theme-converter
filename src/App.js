import React, { useState, useRef } from "react";
import { makeTheme } from "./make-theme";
import decomment from "decomment";
import Code from "./Code";
import Logo from "./logo";
import "styled-components/macro";

import { InputArea, Main, Textarea } from "./elements";

import { PLACEHOLDER, GET_THEME, BUTTON_STYLES } from "./constants";

export default function App() {
  const textarea = useRef();
  const [tab, setTab] = useState("prism");
  const [theme, setTheme] = useState();
  const [error, setError] = useState(false);
  const [vsCodeTheme, setVSCodeTheme] = useState("");

  const createPrismTheme = () => {
    setError(false);
    let t = "";
    try {
      // eslint-disable-next-line
      t = eval("(" + decomment(vsCodeTheme) + ")");
    } catch (e) {
      setError(true);
      return setTheme(`
    // not a valid VSCode Theme
  `);
    }

    if (!t || t.$schema !== "vscode://schemas/color-theme") {
      setError(true);
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
            ref={textarea}
            onChange={(e) => {
              setVSCodeTheme(e.target.value);
              window.setTimeout(() => {
                textarea.current.scrollTo(0, 0);
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
            className={BUTTON_STYLES}
            onClick={createPrismTheme}
          >
            Create Prism Theme
          </button>
        </div>
        <Code
          language={tab === "prism" ? "css" : "json"}
          theme={theme}
          code={theme}
          tab={tab}
          setTab={setTab}
          error={error}
        />
      </InputArea>
    </Main>
  );
}
