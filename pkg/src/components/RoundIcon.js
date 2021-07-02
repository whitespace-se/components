/** @jsxRuntime classic */
/** @jsx jsx */

import Icon from "./Icon";
import withComponentDefaults from "../withComponentDefaults";
import clsx from "clsx";
import { css, jsx } from "@emotion/react";
import PropTypes from "prop-types";

import * as defaultStyles from "./RoundIcon.module.css";

export default withComponentDefaults(RoundIcon, "roundIcon");

RoundIcon.propTypes = {
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  iconProps: PropTypes.object,
  name: PropTypes.string,
  size: PropTypes.string,
  src: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

function RoundIcon({
  className,
  backgroundColor,
  color,
  iconProps,
  name,
  size,
  src,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <span
      className={clsx(styles.component, className)}
      css={css({
        "--round-icon-background-color": backgroundColor,
        "--round-icon-size": size,
      })}
      {...restProps}
    >
      <Icon name={name} src={src} color={color} {...iconProps} />
    </span>
  );
}
