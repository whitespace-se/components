import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { merge } from "lodash/fp";

import themeContext from "../contexts/themeContext";
import themeToCssCustomProps from "../utils/themeToCssCustomProps";

export default function ThemeProvider({ theme, children, ...restProps }) {
  let { global, theme: parentTheme } = useContext(themeContext);
  let cssProps = themeToCssCustomProps(theme);
  let value = { theme: merge(parentTheme, theme), cssProps, ...restProps };
  if (
    process.env.NODE_ENV !== "production" &&
    !global &&
    typeof children !== "function"
  ) {
    console.warn(
      `Children of a nested <ThemeProvider> must be inside a function.`,
    );
  }

  return (
    <>
      {global && (
        <Global
          styles={{
            ":root": cssProps,
          }}
        />
      )}
      <themeContext.Provider value={value}>
        {typeof children === "function" ? children(value) : children}
      </themeContext.Provider>
    </>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  theme: PropTypes.object.isRequired,
};
