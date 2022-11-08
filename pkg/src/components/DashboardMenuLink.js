import React from "react";
import PropTypes from "prop-types";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./DashboardMenuLink.module.css";

import DefaultLink from "./Link";
import withComponentDefaults from "../utils/withComponentDefaults";

DashboardMenuLink.propTypes = {
  children: PropTypes.node,
  components: PropTypes.objectOf(PropTypes.elementType),
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(DashboardMenuLink, "dashboardMenuLink");

function DashboardMenuLink({
  className,
  children,
  components: { Link = DefaultLink, ...components } = { Link: DefaultLink },
  styles = defaultStyles,
  ...restProps
}) {
  let attributes =
    typeof Link === "string" ? filterAttributes(restProps) : restProps;
  return (
    <Link
      styles={styles}
      components={components}
      className={className}
      {...attributes}
    >
      {children}
    </Link>
  );
}
