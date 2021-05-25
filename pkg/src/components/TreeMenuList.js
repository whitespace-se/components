import clsx from "clsx";
import React, { useContext } from "react";
import TreeMenuItem from "./TreeMenuItem";
import PropTypes from "prop-types";
import { treeMenuContext } from "../contexts";

TreeMenuList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    }),
  ).isRequired,
  parentPath: PropTypes.arrayOf(PropTypes.number),
};

export default function TreeMenuList({ items, parentPath = [], ...restProps }) {
  const { styles } = useContext(treeMenuContext);

  if (items.length === 0) {
    return null;
  }

  return (
    <ul
      className={clsx(styles.list, parentPath.length > 0 && styles.sublist)}
      {...restProps}
    >
      {items.map((item, index) => {
        return (
          <TreeMenuItem path={[...parentPath, index]} key={index} item={item} />
        );
      })}
    </ul>
  );
}
