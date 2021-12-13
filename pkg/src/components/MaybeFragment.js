import PropTypes from "prop-types";
import React from "react";

MaybeFragment.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
};

export default function MaybeFragment({ as: Component, children, ...props }) {
  if (!Object.values(props).some(Boolean)) {
    Component = React.Fragment;
    props = {};
  }
  return <Component {...props}>{children}</Component>;
}
