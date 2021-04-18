import React from "react";

import * as defaultStyles from "./Button.module.css";

import Link from "./Link";

export default function Button({
  children,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <Link styles={styles} {...restProps}>
      {children}
    </Link>
  );
}
