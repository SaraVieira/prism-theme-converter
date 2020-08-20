import styled from "styled-components";

export const InputArea = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  position: relative;
  overflow: scroll;
`;

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 0;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  color: #f1f1f1;
  background: #252222;
  line-height: 1.5;
  font-family: monospace;
  padding: 20px;
`;

export const Code = styled.pre`
  position: relative;
  padding: 20px;
  height: calc(100vh - 180px);
  overflow: scroll;
  margin: 0;
  word-break: break-word;
  width: 100%;
  white-space: pre-wrap;
`;
export const Wrapper = styled.div`
  position: relative;
`;
