import React, { createContext, useContext, useState } from "react";

export const locationContext = createContext({});

LocationProvider.propTypes = {};

export function LocationProvider({ children, ...restProps }) {
  const [pathname, setPathname] = useState("/");
  return (
    <locationContext.Provider
      value={[new URL(location.origin + pathname), setPathname]}
    >
      {children}
    </locationContext.Provider>
  );
}

export const InternalLinkElement = React.forwardRef(
  function InternalLinkElement({ href, onClick, children, ...restProps }, ref) {
    const [location, setPathname] = useContext(locationContext);
    return (
      <a
        href={href}
        aria-current={location.pathname === href ? "page" : null}
        {...restProps}
        onClick={(event) => {
          event.preventDefault();
          setPathname(href);
          if (onClick) {
            onClick(event);
          }
        }}
        ref={ref}
      >
        {children}
      </a>
    );
  },
);

export function useLocation() {
  return useContext(locationContext);
}
