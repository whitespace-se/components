import React from "react";
import PropTypes from "prop-types";

import * as defaultStyles from "./Button.module.css";

import DefaultLink from "./Link";
import withComponentDefaults from "../withComponentDefaults";

Button.propTypes = {
  children: PropTypes.node,
  components: PropTypes.exact({
    Link: PropTypes.elementType,
  }),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(Button);

function Button({
  children,
  components: { Link = DefaultLink } = { Link: DefaultLink },
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <Link styles={styles} {...restProps}>
      {children}
    </Link>
  );
}
