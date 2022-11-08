import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Box.module.css";

import withComponentDefaults from "../utils/withComponentDefaults";
import { filterAttributes } from "../utils";

Box.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(Box, "box");

function Box({
  as: Component = "div",
  styles = defaultStyles,
  children,
  ...restProps
}) {
  let attributes =
    typeof Component === "string" ? filterAttributes(restProps) : restProps;
  return (
    <Component className={clsx(styles.component)} {...attributes}>
      {children}
    </Component>
  );
}
