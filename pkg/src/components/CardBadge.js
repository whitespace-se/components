import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Card.module.css";

CardBadge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function CardBadge({
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <div className={clsx(styles.badge, className)} {...restProps}>
      {children}
    </div>
  );
}
