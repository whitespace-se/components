import useComponentDefaults from "./hooks/useComponentDefaults";
import React from "react";

export default function withComponentDefaults(Component, namespace) {
  if (!namespace) {
    console.error(`withComponentDefaults requires namespace`);
    return Component;
  }
  const WrappedComponent = (props) => {
    let extendedProps = useComponentDefaults(namespace, props);
    return <Component {...extendedProps}></Component>;
  };
  let componentName = Component.displayName || Component.name;
  WrappedComponent.displayName = `WithComponentDefaults(${componentName})`;
  return WrappedComponent;
}
