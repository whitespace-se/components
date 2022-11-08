import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import TeaserLink from "./TeaserLink";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./Teaser.module.css";
import { withComponentDefaults } from "../utils";

Teaser.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  link: PropTypes.object,
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(Teaser, "teaser");

function Teaser({
  as: Component = "article",
  children,
  className,
  components: { Link = TeaserLink } = {
    Link: TeaserLink,
  },
  styles = defaultStyles,
  link = {},
  ...restProps
}) {
  let attributes =
    typeof Component === "string" ? filterAttributes(restProps) : restProps;
  return (
    <Component
      className={clsx(
        styles.component,
        // focusWithinStyles.component,
        // focusWithinStyles.outset,
        className,
      )}
      {...attributes}
    >
      <Link className={styles.inner} {...link}>
        {children}
      </Link>
    </Component>
  );
}
