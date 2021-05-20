import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

import DefaultLink from "./Link";

import * as defaultStyles from "./Breadcrumbs.module.css";
import withComponentDefaults from "../withComponentDefaults";

Breadcrumbs.propTypes = {
  components: PropTypes.objectOf(PropTypes.elementType),
  description: PropTypes.string,
  hideDescription: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  separator: PropTypes.node,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(Breadcrumbs);

function Breadcrumbs({
  label = "Brödsmulor",
  description = "Du är här:",
  hideDescription = false,
  components: { Link = DefaultLink } = { Link: DefaultLink },
  items,
  separator = "/",
  styles = defaultStyles,
  className,
  ...restProps
}) {
  return (
    <nav
      aria-label={label}
      className={clsx(
        styles.component,
        // styles.displayAsList,
        className,
      )}
      {...restProps}
    >
      <p className={clsx(styles.description, hideDescription && styles.sronly)}>
        {description}
      </p>
      <ol className={clsx(styles.list)}>
        {items.map((item, index) => {
          return (
            <li key={index} className={clsx(styles.item)}>
              {index !== 0 && (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              )}
              <Link
                to={item.url}
                className={clsx(styles.link)}
                aria-current={index === items.length - 1 ? "page" : null}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
