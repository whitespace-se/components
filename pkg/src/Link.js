import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import * as linkStyles from "./Link.module.css";

function getURLType(url) {
  if (url.startsWith("#")) {
    return "anchor";
  }
  try {
    let { protocol, hostname } = new URL(url);
    if (protocol && protocol !== "http:" && protocol !== "https:") {
      return protocol.substr(0, protocol.length - 1);
    }
    if (hostname) {
      return "external";
    }
  } catch {
    // Continue
  }
  return "internal";
}

export default function Link({
  as,
  buttonComponent = "button",
  children,
  className,
  href,
  htmlFor,
  inertComponent = "span",
  labelComponent = "label",
  linkComponent = "a",
  onClick,
  styles = linkStyles,
  to,
  type,
  uri,
  url,
  ...restProps
}) {
  href =
    href != null && href !== ""
      ? href
      : to != null && to !== ""
      ? to
      : url != null && url !== ""
      ? url
      : uri != null && uri !== ""
      ? uri
      : null;

  type =
    type ||
    (htmlFor
      ? "label"
      : href != null
      ? getURLType(href)
      : onClick
      ? "button"
      : "inert");

  let Component =
    as ||
    (type === "inert"
      ? inertComponent
      : type === "label"
      ? labelComponent
      : type === "button" || type === "submit" || type === "reset"
      ? buttonComponent
      : linkComponent);

  return (
    <Component
      href={href}
      onClick={onClick}
      htmlFor={htmlFor}
      className={clsx(className, styles.component, styles[type])}
      type={
        type === "button" || type === "submit" || type === "reset"
          ? type
          : undefined
      }
      {...restProps}
    >
      {children}
    </Component>
  );
}

Link.propTypes = {
  as: PropTypes.elementType,
  buttonComponent: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  htmlFor: PropTypes.string,
  inertComponent: PropTypes.elementType,
  labelComponent: PropTypes.elementType,
  linkComponent: PropTypes.elementType,
  onClick: PropTypes.func,
  styles: PropTypes.objectOf(PropTypes.string),
  to: PropTypes.string,
  type: PropTypes.string,
  uri: PropTypes.string,
  url: PropTypes.string,
};
