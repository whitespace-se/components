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
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.object,
      download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
      target: PropTypes.string,
      appearance: PropTypes.string,
      compact: PropTypes.bool,
    }),
  ).isRequired,
  as: PropTypes.elementType,
};

DefaultSymbol.propTypes = {
  item: PropTypes.object,
};

function DefaultSymbol({ item, ...restProps }) {
  const isExternal = item.target === "_blank";
  const isDownload = item.download;

  let name = "chevron-right";
  if (isDownload) {
    name = "download";
  }
  if (isExternal) {
    name = "external";
  }
  return <Icon name={name} {...restProps} />;
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
            <li className={clsx(styles.item)} key={index}>
              <Link
                to={item.url}
                target={item.target}
                download={item.download}
                showExternalIcon={false}
                className={clsx(
                  styles.link,
                  styles[item.appearance],
                  item.compact && styles.compact,
                )}
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
                <Symbol item={item} className={clsx(styles.symbol)} />
              </Link>
            </li>
          );
        })}
      </ul>
    </Component>
  );
}
