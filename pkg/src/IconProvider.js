import React, { createContext, useContext } from "react";

export const defaultContextValue = {
  getIconSrc: (name) => void name,
};

export const IconContext = createContext(defaultContextValue);

export default function IconProvider({ children, ...restProps }) {
  return (
    <IconContext.Provider value={{ ...defaultContextValue, ...restProps }}>
      {children}
    </IconContext.Provider>
  );
}

export function useIconContext() {
  return useContext(IconContext);
}
