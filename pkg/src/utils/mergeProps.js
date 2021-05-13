import { mergeAllWith, isArray } from "lodash/fp";

function customizer(defaultVal, newVal) {
  if (newVal === undefined) {
    return defaultVal;
  }
  if (defaultVal === undefined) {
    return newVal;
  }
  if (isArray(newVal)) {
    return newVal;
  }
}

const mergePropsArr = mergeAllWith(customizer);

export default function mergeProps(...propObjects) {
  return mergePropsArr(propObjects);
}
