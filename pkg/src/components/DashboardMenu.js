import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./DashboardMenu.module.css";
import Icon from "./Icon";
import DashboardMenuLink from "./DashboardMenuLink";
import RoundIcon from "./RoundIcon";

DashboardMenu.propTypes = {
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string,
      icon: PropTypes.object,
    }),
  ).isRequired,
  as: PropTypes.elementType,
};

function DefaultArrow({ ...restProps }) {
  return <Icon name="chevron-right" {...restProps} />;
}

export default function DashboardMenu({
  components: {
    Link = DashboardMenuLink,
    Icon = RoundIcon,
    Arrow = DefaultArrow,
  } = {
    Link: DashboardMenuLink,
    Icon: RoundIcon,
    Arrow: DefaultArrow,
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
          return (
            <li className={clsx(styles.item)} key={index}>
              <Link to={item.url} className={clsx(styles.link)}>
                <Icon className={clsx(styles.icon)} {...item.icon} />
                {item.label}
                <Arrow className={clsx(styles.arrow)} />
              </Link>
            </li>
          );
        })}
      </ul>
    </Component>
  );
}
