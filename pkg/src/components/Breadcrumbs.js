import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

import Link from "./Link";

import * as defaultStyles from "./Breadcrumbs.module.css";

Breadcrumbs.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  separator: PropTypes.node,
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function Breadcrumbs({
  label = "Brödsmulor",
  description = "Du är här:",
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
      <p className={styles.description}>{description}</p>
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
