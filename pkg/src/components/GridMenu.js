import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import GridMenuLink from "./GridMenuLink";

import RoundIcon from "./RoundIcon";

import * as defaultStyles from "./GridMenu.module.css";

GridMenu.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.elementType),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      description: PropTypes.node,
      icon: PropTypes.object,
    }),
  ).isRequired,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function GridMenu({
  as: Component = "nav",
  className,
  components: { Link = GridMenuLink, Icon = RoundIcon } = {
    Link: GridMenuLink,
    Icon: RoundIcon,
  },
  items,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <Component className={clsx(styles.component, className)} {...restProps}>
      <ul className={clsx(styles.list)}>
        {items.map((item, index) => {
          const { icon, label, description, ...itemProps } = item;
          return (
            <li key={index} className={clsx(styles.item)}>
              <Link className={clsx(styles.link)} {...itemProps}>
                {icon && <Icon className={clsx(styles.icon)} {...item.icon} />}
                <div className={clsx(styles.text)}>
                  <p className={clsx(styles.title)}>{label}</p>
                  {description && (
                    <p className={clsx(styles.description)}>{description}</p>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Component>
  );
}
