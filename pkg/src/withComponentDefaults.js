import useComponentDefaults from "./hooks/useComponentDefaults";
import React from "react";

export default function withComponentDefaults(Component, { name } = {}) {
  let componentName = name || Component.displayName || Component.name;
  if (!componentName) {
    console.error(
      `withComponentDefaults could not infer wrapped component’s name`,
    );
    return Component;
  }
  const WrappedComponent = (props) => {
    let extendedProps = useComponentDefaults(componentName, props);
    return <Component {...extendedProps}></Component>;
  };
  WrappedComponent.displayName = `WithComponentDefaults(${componentName})`;
  return WrappedComponent;
}
