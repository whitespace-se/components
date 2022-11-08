import React from "react";
import PropTypes from "prop-types";

import * as defaultStyles from "./CoverLink.module.css";

import DefaultLink from "./Link";
import withComponentDefaults from "../utils/withComponentDefaults";
import { filterAttributes } from "../utils";

CoverLink.propTypes = {
  children: PropTypes.node,
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(CoverLink, "coverLink");

function CoverLink({
  children,
  components: { Link = DefaultLink, ...components } = { Link: DefaultLink },
  styles = defaultStyles,
  ...restProps
}) {
  let attributes = filterAttributes(restProps);
  return (
    <Link styles={styles} components={components} {...attributes}>
      {children}
    </Link>
  );
}
