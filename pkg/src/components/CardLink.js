import React from "react";
import PropTypes from "prop-types";

import * as defaultStyles from "./CardLink.module.css";

import DefaultLink from "./Link";
import withComponentDefaults from "../utils/withComponentDefaults";

CardLink.propTypes = {
  children: PropTypes.node,
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(CardLink, "cardLink");

function CardLink({
  children,
  components: { Link = DefaultLink, ...components } = { Link: DefaultLink },
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <Link styles={styles} components={components} {...restProps}>
      {children}
    </Link>
  );
}
