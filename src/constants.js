import nightOwl from "./make-theme/nightOwl";

export const PLACEHOLDER = `
Paste your VSCode theme here.

To get it:
1. Open VSCode
2. Press (CMD or CTRL) + SHIFT + P
3. Enter: '> Developer: Generate Color Scheme From Current Settings'
4. Copy the contents and paste them here!
`;

export const BUTTON_STYLES =
  "inline-flex items-center px-4 py-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150";

export const ACTIVE_TAB = (boolean) =>
  boolean
    ? `w-1/2 py-4 px-1 text-center border-b-2 border-indigo-500 font-medium text-sm leading-5 text-indigo-600 focus:outline-none focus:text-indigo-800 focus:border-indigo-700 bg-white`
    : `w-1/2 py-4 px-1 text-center border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 bg-white`;

export const RESULT_CODE = (theme, code, tab) => {
  if (theme) {
    if (code.plain) {
      return JSON.stringify(code, null, 2);
    } else {
      return code;
    }
  }

  if (tab === "react") {
    return ` //  Your Prism React Render Theme will show up here`;
  }

  if (tab === "highlighter") {
    return ` //  Your React Syntax Highlighter Theme will show up here`;
  }

  return "/* Your Prism Theme will show up here */";
};

export const GET_THEME = (theme) => {
  if (theme && theme.plain) return theme;

  return nightOwl;
};
