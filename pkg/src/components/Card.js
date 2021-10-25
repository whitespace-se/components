import CardLink from "./CardLink";

import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Card.module.css";

Card.propTypes = {
  components: PropTypes.objectOf(PropTypes.elementType),

  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  link: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function Card({
  components: { Link = CardLink } = {
    Link: CardLink,
  },
  as: Component = "article",
  children,
  className,
  link = {},
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <Component className={clsx(styles.component, className)} {...restProps}>
      <Link className={styles.inner} {...link}>
        {children}
      </Link>
    </Component>
  );
}
