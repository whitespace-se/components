import React from "react";
import PropTypes from "prop-types";

import * as defaultStyles from "./SkipTo.module.css";

import DefaultLink from "./Link";
import withComponentDefaults from "../utils/withComponentDefaults";

SkipTo.propTypes = {
  children: PropTypes.node,
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(SkipTo, "skipTo");

function SkipTo({
  children,
  components: { Link = DefaultLink, ...components } = { Link: DefaultLink },
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <Link styles={styles} href="#main" components={components} {...restProps}>
      Hoppa till huvudinnehåll
    </Link>
  );
}
