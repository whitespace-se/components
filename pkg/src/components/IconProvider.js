import PropTypes from "prop-types";
import React, { createContext, useContext } from "react";

export const defaultIconContextValue = {
  getIconSrc: (name) => void name,
};

export const iconContext = createContext(defaultIconContextValue);

export default function IconProvider({ children, ...restProps }) {
  return (
    <iconContext.Provider value={{ ...defaultIconContextValue, ...restProps }}>
      {children}
    </iconContext.Provider>
  );
}

IconProvider.propTypes = {
  children: PropTypes.node,
  getIconSrc: PropTypes.func,
};

export function useIconContext() {
  return useContext(iconContext);
}
