import CardLink from "./CardLink";

import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { filterAttributes } from "../utils";

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
  let attributes =
    typeof Component === "string" ? filterAttributes(restProps) : restProps;
  return (
    <Component className={clsx(styles.component, className)} {...attributes}>
      <Link className={styles.inner} {...link}>
        {children}
      </Link>
    </Component>
  );
}
