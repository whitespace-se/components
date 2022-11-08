import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./Button.module.css";

import DefaultLink from "./Link";
import withComponentDefaults from "../utils/withComponentDefaults";

Button.propTypes = {
  children: PropTypes.node,
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(Button, "button");

function Button({
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
