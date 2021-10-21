import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import HeaderFrontPageMenuLink from "./HeaderFrontPageMenuLink";

import RoundIcon from "./RoundIcon";

import * as defaultStyles from "./HeaderFrontPageMenu.module.css";

HeaderFrontPageMenu.propTypes = {
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string,
      description: PropTypes.string,
      target: PropTypes.string,
      icon: PropTypes.object,
    }),
  ).isRequired,
  as: PropTypes.elementType,
};

export default function HeaderFrontPageMenu({
  components: { Link = HeaderFrontPageMenuLink, Icon = RoundIcon } = {
    Link: HeaderFrontPageMenuLink,
    Icon: RoundIcon,
  },
  className,
  items,
  styles = defaultStyles,
  as: Component = "nav",
  ...restProps
}) {
  return (
    <Component className={clsx(styles.component, className)} {...restProps}>
      <ul className={clsx(styles.list)}>
        {items.map((item, index) => {
          const { url, target, icon, label, description } = item;
          return (
            <li key={index} className={clsx(styles.item)}>
              <Link className={clsx(styles.link)} to={url} target={target}>
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
