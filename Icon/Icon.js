function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import cx from "classnames";
import React from "react"; // import "./Icon.scss";

export function Icon({
  name,
  className,
  color = "currentColor",
  size,
  ...restProps
}) {
  return jsx("span", _extends({
    className: cx("icon", className),
    css: css`
        --icon-color: ${color};
        --icon-size: ${size};
        mask-image: ${name ? `url("/icons/${name}.svg")` : "none"};
      `
  }, restProps));
}