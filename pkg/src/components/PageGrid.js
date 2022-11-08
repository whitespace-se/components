import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./PageGrid.module.css";

PageGrid.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function PageGrid({
  as: Component = "div",
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  let attributes =
    typeof Component === "string" ? filterAttributes(restProps) : restProps;
  return (
    <Component className={clsx(styles.component, className)} {...attributes}>
      {children}
    </Component>
  );
}
