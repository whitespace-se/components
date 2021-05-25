import clsx from "clsx";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSet } from "../hooks";
import { treeMenuContext } from "../contexts";
import PropTypes from "prop-types";
import TreeMenuList from "./TreeMenuList";

import * as defaultStyles from "./TreeMenu.module.css";

TreeMenu.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    }),
  ).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function TreeMenu({
  styles = defaultStyles,
  className,
  items,
  location,
  ...restProps
}) {
  const [
    expandedItems,
    { toggle: toggleExpandedItem, has: isItemExpanded, add: expandItem },
  ] = useSet([], (a, b) => String(a) === String(b));

  const itemsRef = useRef({});

  const findItemPath = useCallback(
    (condition) => {
      const item = items.findIndex(condition);
      return ~item ? [item] : null;
    },
    [items],
  );

  const getItemByPath = useCallback(
    (path) => {
      return path.reduce();
    },
    [items],
  );

  const isCurrentItem = useCallback(
    (item) => {
      return item.url && item.url === location.pathname;
    },
    [location.pathname],
  );

  const currentItemPath = useMemo(() => findItemPath(isCurrentItem), [
    isCurrentItem,
    findItemPath,
  ]);

  useEffect(
    () => {
      currentItemPath.reduce((path, index) => {
        path = [...path, index];
        expandItem(path);
        return path;
      }, []);
    },
    [JSON.stringify(currentItemPath)],
    getItemByPath,
  );

  const registerItemRef = useCallback((path, ref) => {
    itemsRef.current[path] = ref;
    console.log(ref);
    return () => {
      delete itemsRef.current[path];
    };
  }, []);

  const setFocus = useCallback((path) => {
    console.log(path, itemsRef.current[path]);
    itemsRef.current[path]?.current?.focus();
  }, []);

  const treeMenuContextValue = {
    expandedItems,
    isCurrentItem,
    isItemExpanded,
    registerItemRef,
    setFocus,
    styles,
    toggleExpandedItem,
  };
  /**
   * State som trackar fokus?
   * Piltangenter för att flytta fokus och fälla in/ut
   * Space för att fälla in/ut
   * Enter för att navigera
   * Tabb ska lämna menyn
   * Home/end för att gå till första/sista
   * Visa pil/plus/minus om barn finns
   * Knapp för att fälla in/ut
   * Fokusring på hela <li>
   */
  return (
    <treeMenuContext.Provider value={treeMenuContextValue}>
      <nav
        className={clsx(className, styles.component)}
        {...restProps}
        tabIndex={0}
      >
        <TreeMenuList items={items} />
      </nav>
    </treeMenuContext.Provider>
  );
}
