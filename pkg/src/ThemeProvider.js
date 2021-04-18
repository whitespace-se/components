import React from "react";
import PropTypes from "prop-types";
import { Global, css } from "@emotion/react";

import themeContext from "./themeContext";
import themeToCssCustomProps from "./utils/themeToCssCustomProps";

export default function ThemeProvider({ theme, children, ...restProps }) {
  let cssProps = themeToCssCustomProps(theme);
  return (
    <>
      <Global
        styles={css`
          :root {
            ${Object.entries(cssProps).map(
              ([prop, value]) => `${prop}: ${value};`,
            )}
          }
        `}
      />
      <themeContext.Provider value={{ theme, ...restProps }}>
        {children}
      </themeContext.Provider>
    </>
  );
}

ThemeProvider.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.node,
};
