import React from "react";
import PropTypes from "prop-types";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./TeaserLink.module.css";

import DefaultLink from "./Link";
import withComponentDefaults from "../utils/withComponentDefaults";

TeaserLink.propTypes = {
  children: PropTypes.node,
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(TeaserLink, "teaserLink");

function TeaserLink({
  children,
  components: { Link = DefaultLink, ...components } = { Link: DefaultLink },
  styles = defaultStyles,
  ...restProps
}) {
  let attributes = filterAttributes(restProps);
  return (
    <Link styles={styles} components={components} {...attributes}>
      {children}
    </Link>
  );
}
