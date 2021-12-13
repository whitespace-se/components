import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Teaser.module.css";

TeaserContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function TeaserContent({
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <div className={clsx(styles.content, className)} {...restProps}>
      {children}
    </div>
  );
}
