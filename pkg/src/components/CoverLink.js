import React from "react";
import PropTypes from "prop-types";

import * as defaultStyles from "./CoverLink.module.css";

import DefaultLink from "./Link";
import withComponentDefaults from "../withComponentDefaults";

CoverLink.propTypes = {
  children: PropTypes.node,
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(CoverLink, "coverLink");

function CoverLink({
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
