import React from "react";

import * as buttonStyles from "./Button.module.css";

import Link from "./Link";

export default function Button({
  children,
  styles = buttonStyles,
  ...restProps
}) {
  return (
    <Link styles={styles} {...restProps}>
      {children}
    </Link>
  );
}
