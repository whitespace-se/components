import traverse from "traverse";
import { kebabCase } from "lodash/fp";

export default function themeToCssCustomProps(
  theme,
  { defaultName = "default" } = {},
) {
  let props = {};
  traverse(theme).forEach(function (node) {
    if (this.isLeaf) {
      let prop = `--${this.path
        .filter((name) => name !== defaultName)
        .map(kebabCase)
        .join("-")}`;
      let value = node;
      props[prop] = value;
    }
  });
  return props;
}
