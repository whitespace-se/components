import { Button, Link } from "@whitespace/components";
import { treeMenuContext } from "@whitespace/components/src/contexts";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useCallback, useContext } from "react";
import { filterAttributes } from "../utils";

import TreeMenuList from "./TreeMenuList";

TreeMenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.object),
    url: PropTypes.string,
    label: PropTypes.string.isRequired,
  }).isRequired,
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default function TreeMenuItem({ item, path, ...restProps }) {
  let attributes = filterAttributes(restProps);
  const { id, children = [], url, label } = item;

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
  let isCurrent = isCurrentItem(item);

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
      {...attributes}
      className={clsx(styles.item, isCurrent && styles.current)}
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
            as="button"
            styles={{}}
            className={clsx(
              styles.toggle,
              isExpanded ? styles.expanded : styles.collapsed,
            )}
            tabIndex={-1}
            aria-expanded={isExpanded}
            aria-controls={id}
          />
        )}
      </div>
      {!!children.length && (
        <TreeMenuList
          id={id}
          expanded={isExpanded}
          items={children}
          parentPath={path}
        />
      )}
    </li>
  );
}
