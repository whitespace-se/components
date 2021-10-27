import React from "react";

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
  ...restProps
}) {
  return <img src={src} alt="" {...restProps} />;
}
