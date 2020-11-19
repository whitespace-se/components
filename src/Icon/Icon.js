/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import cx from "classnames";
import React from "react";

// import "./Icon.scss";

export function Icon({
  name,
  className,
  color = "currentColor",
  size,
  ...restProps
}) {
  return (
    <span
      className={cx("icon", className)}
      css={css`
        --icon-color: ${color};
        --icon-size: ${size};
        mask-image: ${name ? `url("/icons/${name}.svg")` : "none"};
      `}
      {...restProps}
    />
  );
}
