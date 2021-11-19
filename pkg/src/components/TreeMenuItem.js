import clsx from "clsx";
import Link from "./Link";
import Button from "./Button";

import { treeMenuContext } from "../contexts";
import React, { useCallback, useContext } from "react";
import TreeMenuList from "./TreeMenuList";
import PropTypes from "prop-types";

TreeMenuItem.propTypes = {
  item: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.object),
    url: PropTypes.string,
    label: PropTypes.string.isRequired,
  }).isRequired,
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default function TreeMenuItem({ item, path, ...restProps }) {
  const { children = [], url, label } = item;

  const {
    isCurrentItem,
    isFocusedPath,
    isItemExpanded,
    registerItemElement,
    setFocusedPath,
    styles,
    toggleExpandedItem,
  } = useContext(treeMenuContext);

  const refCallback = useCallback((element) => {
    registerItemElement(path, element);
  }, []);

  const handleLinkClick = useCallback(() => {
    setFocusedPath(path);
  }, []);

  let isExpanded = isItemExpanded(path);

  let linkProps = {
    innerRef: refCallback,
    // innerRef={linkRef}
    to: url,
    key: "link",
    tabIndex: isFocusedPath(path) ? 0 : -1,
    className: clsx(styles.link),
    onClick: handleLinkClick,
  };

  if (isExpanded) {
    linkProps["aria-expanded"] = isExpanded;
  }

  return (
    <li
      {...restProps}
      className={clsx(styles.item, isCurrentItem(item) && styles.current)}
    >
      <div className={styles.row}>
        <Link {...linkProps}> {label}</Link>
        {!!children.length && (
          <Button
            onClick={() => {
              toggleExpandedItem(path);
            }}
            onFocus={() => {
              setFocusedPath(path);
            }}
            key="toggle"
            as="span"
            styles={{}}
            className={clsx(
              styles.toggle,
              isExpanded ? styles.expanded : styles.collapsed,
            )}
            tabIndex={-1}
          ></Button>
        )}
      </div>
      {!!children.length && isExpanded && (
        <TreeMenuList items={children} parentPath={path} />
      )}
    </li>
  );
}
