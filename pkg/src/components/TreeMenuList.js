import { treeMenuContext } from "@whitespace/components/src/contexts";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { filterAttributes } from "../utils";

import TreeMenuItem from "./TreeMenuItem";

TreeMenuList.propTypes = {
  expanded: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  parentPath: PropTypes.arrayOf(PropTypes.number),
};

export default function TreeMenuList({
  expanded = true,
  items,
  parentPath = [],
  ...restProps
}) {
  const { styles } = useContext(treeMenuContext);

  if (items.length === 0) {
    return null;
  }

  let attributes = filterAttributes(restProps);

  return (
    <ul
      className={clsx(styles.list, parentPath.length > 0 && styles.sublist)}
      hidden={!expanded}
      {...attributes}
    >
      {items.map((item, index) => {
        return (
          <TreeMenuItem path={[...parentPath, index]} key={index} item={item} />
        );
      })}
    </ul>
  );
}
