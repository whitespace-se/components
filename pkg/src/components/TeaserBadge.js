import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Teaser.module.css";

TeaserBadge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function TeaserBadge({
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
