import { H } from "@jfrk/react-heading-levels";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Card.module.css";

CardTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function CardTitle({
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <H className={clsx(styles.title, className)} {...restProps}>
      {children}
    </H>
  );
}
