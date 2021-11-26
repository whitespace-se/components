/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./PageGrid.module.css";

PageGridGroup.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function PageGridGroup({
  as: Component = "div",
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <Component className={clsx(styles.group, className)} {...restProps}>
      {children}
    </Component>
  );
}
