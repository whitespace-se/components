import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./PageGridItem.module.css";

PageGridItem.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function PageGridItem({
  as: Component = "div",
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <Component className={clsx(styles.component, className)} {...restProps}>
      {children}
    </Component>
  );
}
