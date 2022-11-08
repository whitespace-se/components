import clsx from "clsx";
import React from "react";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./Image.module.css";

export default function Image({
  WrapperComponent = null,
  src,
  srcSet,
  srcWebp,
  srcSetWebp,
  width,
  height,
  base64,
  aspectRatio,
  alt,
  caption,
  credit,
  linkTo,
  estimatedWidth = 320,
  imgProps: { className: imgClassName, ...imgRestProps } = {},
  linkProps: { className: linkClassName, ...linkRestProps } = {},
  className,
  styles = defaultStyles,
  ...restProps
}) {
  let attributes = filterAttributes(restProps);
  return (
    <img
      className={clsx(styles.component, className)}
      src={src}
      alt=""
      {...attributes}
    />
  );
}
