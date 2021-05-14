import { mergeAllWith, isArray } from "lodash/fp";

function customizer(defaultVal, newVal) {
  if (isArray(newVal)) {
    return newVal;
  }
}

const mergePropsArr = mergeAllWith(customizer);

export default function mergeProps(...propObjects) {
  return mergePropsArr(propObjects);
}
