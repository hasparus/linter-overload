export const theme = {
  font: "'Fira Code', 'Fira Sans', monospace",
  googleFont:
    "https://fonts.googleapis.com/css?family=Fira+Mono:400,700&display=swap&subset=latin-ext",
  li: {
    fontSize: "1.5rem",
    margin: "1rem 0",
  },
  blockquote: {
    fontStyle: "italic",
    backgroundColor: "#f8f8f8",
    padding: "1rem",
    border: "1px solid black",
    boxShadow: "0.5rem 0.9rem 0 0.2rem",
  },
};

import { Global, css } from "@emotion/core";

export const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        color: hotpink;
      }
      del {
        background-color: hotpink;
      }
    `}
  />
);
