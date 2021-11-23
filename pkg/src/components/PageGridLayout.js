import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./PageGrid.module.css";

PageGridLayout.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function PageGridLayout({
  as: Component = "div",
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <Component className={clsx(styles.layout, className)} {...restProps}>
      {children}
      {/* {React.Children.map(children, (item) => {
          console.log(item);
          return (
            item &&
            React.cloneElement(item, {
              className: clsx(item.className, styles.item),
            })
          );
        })} */}
    </Component>
  );
}
