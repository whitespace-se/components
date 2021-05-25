import clsx from "clsx";
import Link from "./Link";
import Button from "./Button";

import { treeMenuContext } from "../contexts";
import React, { useContext, useEffect, useRef } from "react";
import Icon from "./Icon";
import TreeMenuList from "./TreeMenuList";
import PropTypes from "prop-types";

TreeMenuItem.propTypes = {
  item: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.object),
    url: PropTypes.string,
    label: PropTypes.label,
  }).isRequired,
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default function TreeMenuItem({ item, path, ...restProps }) {
  const { children = [], url, label } = item;

  const linkRef = useRef();

  const {
    isCurrentItem,
    isItemExpanded,
    styles,
    toggleExpandedItem,
    setFocus,
    registerItemRef,
  } = useContext(treeMenuContext);

  useEffect(() => registerItemRef(path, linkRef), []);

  return (
    <li
      {...restProps}
      className={clsx(styles.item, isCurrentItem(item) && styles.current)}
    >
      <div className={styles.row}>
        {!!children.length && (
          <Button
            onClick={() => {
              toggleExpandedItem(path);
            }}
            as="span"
          >
            <Icon name="search" />
          </Button>
        )}
        <Button
          innerRef={linkRef}
          to={url}
          tabIndex={-1}
          className={clsx(styles.link)}
          onFocus={() => {
            console.log(linkRef.current);
            setFocus(path);
          }}
        >
          {label}
        </Button>
      </div>
      {!!children.length && isItemExpanded(path) && (
        <TreeMenuList items={children} parentPath={path} />
      )}
    </li>
  );
}
