import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./PageGrid.module.css";

PageGridSection.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  width: PropTypes.oneOf(["full"]),
};

export default function PageGridSection({
  as: Component = "div",
  children,
  className,
  styles = defaultStyles,
  width,
  ...restProps
}) {
  return (
    <Component
      className={clsx(
        styles.section,
        width === "full" && styles.fullWidth,
        className,
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
}
