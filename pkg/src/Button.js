import React from "react";
import PropTypes from "prop-types";

import * as defaultStyles from "./Button.module.css";

import Link from "./Link";

export default function Button({
  children,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <Link styles={styles} {...restProps}>
      {children}
    </Link>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.objectOf(PropTypes.string),
};
