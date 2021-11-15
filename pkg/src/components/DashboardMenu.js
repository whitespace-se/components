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
      display: PropTypes.string,
      url: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.object,
      download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
      target: PropTypes.string,
    }),
  ).isRequired,
  as: PropTypes.elementType,
};

function DefaultSymbol({ download, ...restProps }) {
  let iconName = "chevron-right";
  if (download) {
    iconName = "download";
  }
  return <Icon name={iconName} {...restProps} />;
}

export default function DashboardMenu({
  components: {
    Link = DashboardMenuLink,
    Icon = RoundIcon,
    Symbol = DefaultSymbol,
  } = {
    Link: DashboardMenuLink,
    Icon: RoundIcon,
    Symbol: DefaultSymbol,
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
            <li className={clsx(styles.item, styles[item.display])} key={index}>
              <Link
                to={item.url}
                download={item.download}
                target={item.target}
                className={clsx(styles.link)}
              >
                <Icon className={clsx(styles.icon)} {...item.icon} />
                <div className={clsx(styles.content)}>
                  {item.title && (
                    <p className={clsx(styles.title)}>{item.title}</p>
                  )}
                  {item.description && (
                    <p className={clsx(styles.description)}>
                      {item.description}
                    </p>
                  )}
                </div>
                <Symbol
                  download={item.download}
                  className={clsx(styles.symbol)}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </Component>
  );
}
