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

function encodePath(path) {
  return JSON.stringify(path);
}

function decodePath(path) {
  return JSON.parse(path);
}

function documentPositionComparator(a, b) {
  if (a === b) {
    return 0;
  }

  var position = a.compareDocumentPosition(b);

  if (
    position & Node.DOCUMENT_POSITION_FOLLOWING ||
    position & Node.DOCUMENT_POSITION_CONTAINED_BY
  ) {
    return -1;
  } else if (
    position & Node.DOCUMENT_POSITION_PRECEDING ||
    position & Node.DOCUMENT_POSITION_CONTAINS
  ) {
    return 1;
  } else {
    return 0;
  }
}

export default function TreeMenu({
  styles = defaultStyles,
  className,
  items,
  location,
  ...restProps
}) {
  const [
    expandedItems,
    {
      toggle: toggleExpandedItem,
      has: isItemExpanded,
      add: expandItem,
      delete: collapseItem,
    },
  ] = useSet([], (a, b) => encodePath(a) === encodePath(b));

  const itemsRef = useRef({});

  const focusDummyRef = useRef();

  const [encodedFocusedPath, setEncodedFocusedPath] = useState(encodePath([0]));

  const focusedPath = decodePath(encodedFocusedPath);

  const setFocusedPath = useCallback((path) => {
    setEncodedFocusedPath(
      encodePath(
        path.map((index, pos) =>
          index >= 0
            ? index
            : getItemByPath(path.slice(0, pos + 1)).children.length + index,
        ),
      ),
    );
  }, []);

  const isFocusedPath = useCallback(
    (path) => {
      return encodePath(path) === encodePath(focusedPath);
    },
    [focusedPath],
  );

  const findItemPath = useCallback(
    (condition) => {
      const item = items.findIndex(condition);
      return ~item ? [item] : null;
    },
    [items],
  );

  const getItemByPath = useCallback(
    (path) => {
      return path.reduce(
        (item, index) =>
          item?.children?.[index >= 0 ? index : item?.children?.length + index],
        {
          children: items,
        },
      );
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

  useEffect(() => {
    (currentItemPath || []).reduce((path, index) => {
      path = [...path, index];
      expandItem(path);
      return path;
    }, []);
  }, [encodePath(currentItemPath)]);

  const registerItemElement = useCallback((path, element) => {
    if (element == null) {
      let prevElement = itemsRef.current[encodePath(path)];
      if (prevElement === document.activeElement) {
        focusDummyRef.current.focus();
      }
      delete itemsRef.current[encodePath(path)];
    } else {
      itemsRef.current[encodePath(path)] = element;
      updateFocus();
    }
  }, []);

  const ref = useRef();

  const updateFocus = useCallback(() => {
    let element = itemsRef.current[encodedFocusedPath];
    if (
      element &&
      document.activeElement !== element &&
      ref.current &&
      ref.current.contains(document.activeElement)
    ) {
      element.focus();
    }
  }, [encodedFocusedPath]);

  useEffect(() => {
    updateFocus();
  }, [updateFocus]);

  /**
   * Moves focus to the next visible item (child, sibling or ancestor’s sibling)
   */
  const handleDownKey = useCallback(() => {
    let focusedElement = itemsRef.current[encodedFocusedPath];
    let focusableElements = Object.values(itemsRef.current);
    focusableElements.sort(documentPositionComparator);
    let index = focusableElements.indexOf(focusedElement) + 1;
    let nextElement = focusableElements[index % focusableElements.length];
    let key = Object.keys(itemsRef.current).find(
      (key) => itemsRef.current[key] === nextElement,
    );
    setEncodedFocusedPath(key);
  }, [encodedFocusedPath]);

  /**
   * Moves focus to the previous visible item (sibling or parent)
   */
  const handleUpKey = useCallback(() => {
    let focusedElement = itemsRef.current[encodedFocusedPath];
    let focusableElements = Object.values(itemsRef.current);
    focusableElements.sort(documentPositionComparator);
    let index = focusableElements.indexOf(focusedElement) - 1;
    let prevElement =
      focusableElements[
        (focusableElements.length + index) % focusableElements.length
      ];
    let key = Object.keys(itemsRef.current).find(
      (key) => itemsRef.current[key] === prevElement,
    );
    setEncodedFocusedPath(key);
  }, [encodedFocusedPath]);

  /**
   * Expands the focused item if it is collapsed. Moves focus to its first child
   * item otherwise
   */
  const handleRightKey = useCallback(() => {
    if (!isItemExpanded(focusedPath)) {
      expandItem(focusedPath);
    } else {
      let firstChildPath = [...focusedPath, 0];
      let firstChildItem = getItemByPath(firstChildPath);
      if (firstChildItem) {
        setFocusedPath(firstChildPath);
      }
    }
  }, [encodedFocusedPath, focusedPath]);

  /**
   * Collapses the focused item if it is expanded. Moves focus to its parent
   * item otherwise
   */
  const handleLeftKey = useCallback(() => {
    if (isItemExpanded(focusedPath)) {
      collapseItem(focusedPath);
    } else {
      let parentPath = focusedPath.slice(0, -1);
      if (parentPath.length > 0) {
        setFocusedPath(parentPath);
      }
    }
  }, [focusedPath]);

  /**
   * Expands/collapses the focused item
   */
  const handleSpaceKey = useCallback(() => {
    toggleExpandedItem(focusedPath);
  }, [focusedPath]);

  /**
   * Moves focus to the first visible item
   */
  const handleEndKey = useCallback(() => {
    let focusableElements = Object.values(itemsRef.current);
    focusableElements.sort(documentPositionComparator);
    let lastElement = focusableElements[focusableElements.length - 1];
    let key = Object.keys(itemsRef.current).find(
      (key) => itemsRef.current[key] === lastElement,
    );
    setEncodedFocusedPath(key);
  }, [encodedFocusedPath]);

  /**
   * Moves focus to the last visible item
   */
  const handleHomeKey = useCallback(() => {
    let focusableElements = Object.values(itemsRef.current);
    focusableElements.sort(documentPositionComparator);
    let firstElement = focusableElements[0];
    let key = Object.keys(itemsRef.current).find(
      (key) => itemsRef.current[key] === firstElement,
    );
    setEncodedFocusedPath(key);
  }, [encodedFocusedPath]);

  const treeMenuContextValue = {
    expandedItems,
    isCurrentItem,
    isFocusedPath,
    isItemExpanded,
    registerItemElement,
    setFocusedPath,
    styles,
    toggleExpandedItem,
  };

  return (
    <treeMenuContext.Provider value={treeMenuContextValue}>
      <nav
        className={clsx(className, styles.component)}
        {...restProps}
        ref={ref}
        onFocus={() => {
          updateFocus();
        }}
        onKeyDown={(event) => {
          switch (event.key) {
            case "Down":
            case "ArrowDown":
              event.preventDefault();
              event.stopPropagation();
              return handleDownKey(event);
            case "Up":
            case "ArrowUp":
              event.preventDefault();
              event.stopPropagation();
              return handleUpKey(event);
            case "Right":
            case "ArrowRight":
              event.preventDefault();
              event.stopPropagation();
              return handleRightKey(event);
            case "Left":
            case "ArrowLeft":
              event.preventDefault();
              event.stopPropagation();
              return handleLeftKey(event);
            case "End":
              event.preventDefault();
              event.stopPropagation();
              return handleEndKey(event);
            case "Home":
              event.preventDefault();
              event.stopPropagation();
              return handleHomeKey(event);
            case " ":
              event.preventDefault();
              event.stopPropagation();
              return handleSpaceKey(event);
          }
        }}
      >
        <span tabIndex={-1} ref={focusDummyRef}></span>
        <TreeMenuList items={items} />
      </nav>
    </treeMenuContext.Provider>
  );
}
