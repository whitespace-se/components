import React, { memo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { visuallyHidden } from "../utils/styles.module.css";
import * as defaultStyles from "./Link.module.css";
import withComponentDefaults from "../utils/withComponentDefaults";
import { useURLTransformer } from "../hooks";
import { filterAttributes } from "../utils";

import Icon from "./Icon";

function upperFirst(string) {
  return string[0].toUpperCase() + string.slice(1);
}

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

export default memo(withComponentDefaults(Link, "link"));

function Link({
  as,
  components: {
    ButtonElement = "button",
    InertElement = "span",
    LabelElement = "label",
    DefaultElement = "a",
    ...components
  } = {
    ButtonElement: "button",
    InertElement: "span",
    LabelElement: "label",
    DefaultElement: "a",
  },
  children,
  className,
  href,
  htmlFor,
  innerRef,
  onClick,
  rel,
  styles = defaultStyles,
  target,
  to,
  type,
  uri,
  url,
  showExternalIcon = true,
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

  const transformURL = useURLTransformer();

  href = transformURL(href);

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
    (type === "inert" && InertElement) ||
    (type === "label" && LabelElement) ||
    (type === "submit" &&
      (components["SubmitButtonElement"] || ButtonElement)) ||
    (type === "reset" && (components["ResetButtonElement"] || ButtonElement)) ||
    (type === "button" && ButtonElement) ||
    components[upperFirst(type) + "LinkElement"] ||
    DefaultElement;

  /**
   * Add rel="noopener noreferrer" to links with target="_blank"
   */
  if (target === "_blank") {
    rel = [
      ...new Set([...(rel ? rel.split(/\s+/g) : []), "noopener", "noreferrer"]),
    ].join(" ");
  }

  let attributes =
    typeof Component === "string" ? filterAttributes(restProps) : restProps;

  const refAttribute =
    typeof Component === "function" && Component.name === "InternalLinkElement"
      ? { innerRef: innerRef }
      : { ref: innerRef };

  return (
    <Component
      href={href}
      onClick={onClick}
      htmlFor={htmlFor}
      className={clsx(className, styles.component, styles[type])}
      target={target}
      rel={rel}
      type={
        type === "button" || type === "submit" || type === "reset"
          ? type
          : undefined
      }
      {...attributes}
      {...refAttribute}
    >
      {children}
      {target === "_blank" && (
        <>
          <span className={visuallyHidden}>Öppnas i nytt fönster</span>
          {showExternalIcon && (
            <Icon name="external" className={clsx(styles.icon)} />
          )}
        </>
      )}
    </Component>
  );
}

Link.propTypes = {
  as: PropTypes.elementType,
  buttonComponent: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.elementType),
  href: PropTypes.string,
  htmlFor: PropTypes.string,
  innerRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({
      current:
        typeof Element !== "undefined"
          ? PropTypes.instanceOf(Element)
          : PropTypes.any,
    }),
  ]),
  inertComponent: PropTypes.elementType,
  labelComponent: PropTypes.elementType,
  linkComponent: PropTypes.elementType,
  onClick: PropTypes.func,
  rel: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  target: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
  uri: PropTypes.string,
  url: PropTypes.string,
  showExternalIcon: PropTypes.bool,
};
