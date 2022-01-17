import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

import * as defaultStyles from "./Box.module.css";

import withComponentDefaults from "../utils/withComponentDefaults";

Box.propTypes = {
  children: PropTypes.node,
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(Box, "box");

function Box({ styles = defaultStyles, children, ...restProps }) {
  return (
    <div className={clsx(styles.component)} {...restProps}>
      {children}
    </div>
  );
}
