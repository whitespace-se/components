import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./InlineList.module.css";

import withComponentDefaults from "../utils/withComponentDefaults";

InlineList.propTypes = {
  components: PropTypes.objectOf(PropTypes.elementType),
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  link: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(InlineList, "inlineList");

function InlineList({
  as: Component = "ul",
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  let attributes =
    typeof Component === "string" ? filterAttributes(restProps) : restProps;
  return (
    <Component className={clsx(styles.component, className)} {...attributes}>
      {React.Children.map(children, (child, index) => {
        return <li key={index}>{child}</li>;
      })}
    </Component>
  );
}
