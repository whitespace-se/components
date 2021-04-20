import PropTypes from "prop-types";
import React, { createContext, useContext } from "react";

export const defaultIconContextValue = {
  getIconSrc: (name) => void name,
};

export const iconContext = createContext(defaultIconContextValue);

export default function IconProvider({
  children,
  icons,
  getIconSrc,
  ...restProps
}) {
  if (!getIconSrc && icons) {
    getIconSrc = (name) => icons[name];
  }
  return (
    <iconContext.Provider
      value={{ ...defaultIconContextValue, icons, getIconSrc, ...restProps }}
    >
      {children}
    </iconContext.Provider>
  );
}

IconProvider.propTypes = {
  children: PropTypes.node,
  getIconSrc: PropTypes.func,
  icons: PropTypes.objectOf(PropTypes.string),
};

export function useIconContext() {
  return useContext(iconContext);
}
