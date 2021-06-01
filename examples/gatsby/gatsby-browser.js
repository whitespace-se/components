import { ThemeProvider } from "@whitespace/components";
import theme from "./src/theme";
import React from "react";

export const wrapPageElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};
