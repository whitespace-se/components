/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./PageGrid.module.css";

PageGridItem.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function PageGridItem({
  as: Component = "div",
  colSpan,
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  let attributes =
    typeof Component === "string" ? filterAttributes(restProps) : restProps;
  return (
    <Component
      css={css`
        --page-grid-columns: ${colSpan || null};
      `}
      className={clsx(styles.item, className)}
      {...attributes}
    >
      {children}
    </Component>
  );
}
