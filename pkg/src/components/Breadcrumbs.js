// Ref: https://codepen.io/peterantonius/pen/RwKdXvr

import clsx from "clsx";
import React from "react";

import Link from "./Link";

import * as styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({
  label = "Brödsmulor",
  description = "Du är här:",
  items,
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
      <div className={clsx("")}>
        <p className={styles.description}>{description}</p>
        <ol className={clsx(styles.list)}>
          {items.map((item, index) => {
            if (!item) {
              console.warn("One breadcrumb was null", items);
              return null;
            }
            return (
              <li key={index} className={clsx(styles.item)}>
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
      </div>
    </nav>
  );
}
