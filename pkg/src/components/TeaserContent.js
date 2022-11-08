import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { filterAttributes } from "../utils";

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
  let attributes = filterAttributes(restProps);
  return (
    <div className={clsx(styles.content, className)} {...attributes}>
      {children}
    </div>
  );
}
