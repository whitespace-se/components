import React from "react";
import PropTypes from "prop-types";

import * as defaultStyles from "./GridMenuLink.module.css";
import { filterAttributes } from "../utils";

import DefaultLink from "./Link";
import withComponentDefaults from "../utils/withComponentDefaults";

GridMenuLink.propTypes = {
  children: PropTypes.node,
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(GridMenuLink, "gridMenuLink");

function GridMenuLink({
  children,
  components: { Link = DefaultLink, ...components } = { Link: DefaultLink },
  styles = defaultStyles,
  ...restProps
}) {
  let attributes =
    typeof Link === "string" ? filterAttributes(restProps) : restProps;
  return (
    <Link styles={styles} components={components} {...attributes}>
      {children}
    </Link>
  );
}
