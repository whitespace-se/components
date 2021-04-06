/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import cx from "classnames";

import * as iconStyles from "./Icon.module.css";
import { useIconContext } from "./IconProvider";

export default function Icon({ name, className, color, size, ...restProps }) {
  let { getIconPath } = useIconContext();
  let iconPath = getIconPath(name);
  return (
    <span
      className={cx(iconStyles.icon)}
      css={css`
        --icon-color: ${color};
        --icon-size: ${size};
        mask-image: ${name ? `url("${iconPath}")` : "none"};
      `}
      {...restProps}
    />
  );
}
