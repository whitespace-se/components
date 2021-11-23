import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import PageGrid from "./PageGrid";

import * as defaultStyles from "./PageGrid.module.css";

PageGridRow.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function PageGridRow({
  styles = defaultStyles,
  children,
  className,
  ...restProps
}) {
  return (
    <PageGrid className={clsx(styles.row, className)} {...restProps}>
      {children}
    </PageGrid>
  );
}
