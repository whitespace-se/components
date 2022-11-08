import React from "react";
import PropTypes from "prop-types";
import { filterAttributes } from "../utils";

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
  components: { Link = DefaultLink, ...components } = { Link: DefaultLink },
  styles = defaultStyles,
  ...restProps
}) {
  let attributes =
    typeof Link === "string" ? filterAttributes(restProps) : restProps;
  return (
    <Link styles={styles} href="#main" components={components} {...attributes}>
      Hoppa till huvudinnehåll
    </Link>
  );
}
