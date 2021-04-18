/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import clsx from "clsx";
import PropTypes from "prop-types";

import * as defaultStyles from "./Icon.module.css";
import { useIconContext } from "./IconProvider";

export default function Icon({
  children,
  className,
  color,
  name,
  src,
  styles = defaultStyles,
  size,
  ...restProps
}) {
  void children;

  let { getIconSrc } = useIconContext();
  if (name) {
    src = getIconSrc(name);
  }

  if (!src) {
    if (process.env.NODE_ENV !== "production") {
      if (name) {
        console.warn(
          `Could not find any icon by the name "${name}". Did you wrap your app in an <IconProvider> and pass a "getIconSrc" prop?`,
        );
      } else {
        console.warn(`No "src" or "name" prop provided to <Icon> component.`);
      }
    }
  }

  return (
    <span
      className={clsx(styles.component, className)}
      css={css`
        --icon-color: ${color};
        --icon-size: ${size};
        mask-image: url(${src});
      `}
      {...restProps}
    />
  );
}

Icon.propTypes = {
  children: PropTypes.oneOf([null, undefined, "", false]),
  className: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string,
  src: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  size: PropTypes.string,
};
