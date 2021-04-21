import traverse from "traverse";
import { kebabCase } from "lodash/fp";

export default function themeToCssCustomProps(
  theme,
  { defaultName = "default" } = {},
) {
  let props = {};
  traverse(theme).forEach(function (value) {
    if (
      this.isLeaf &&
      (typeof value === "string" || typeof value === "number") &&
      value !== ""
    ) {
      let prop = `--${this.path
        .filter((name) => name !== defaultName)
        .map(kebabCase)
        .join("-")}`;
      props[prop] = value;
    }
  });
  return props;
}
