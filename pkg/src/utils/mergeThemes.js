import { mergeAllWith, isArray } from "lodash/fp";

function customizer(defaultVal, newVal) {
  if (isArray(newVal)) {
    return newVal;
  }
}

const mergeThemesArr = mergeAllWith(customizer);

export default function mergeThemes(...propObjects) {
  return mergeThemesArr(propObjects);
}
