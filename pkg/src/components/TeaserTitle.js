import { H } from "@jfrk/react-heading-levels";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./Teaser.module.css";

TeaserTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function TeaserTitle({
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  let attributes = filterAttributes(restProps);
  return (
    <H className={clsx(styles.title, className)} {...attributes}>
      {children}
    </H>
  );
}
