import useTheme from "./useTheme";
import mergeProps from "../utils/mergeProps";

function lowerFirst(string) {
  return string[0].toLowerCase() + string.slice(1);
}

export default function useComponentDefaults(componentName, props) {
  let theme = useTheme();
  let globalDefaults = theme["default"];
  let componentDefaults = theme[lowerFirst(componentName)];
  if (!componentDefaults && !globalDefaults) {
    return props;
  }
  return mergeProps(globalDefaults || {}, componentDefaults || {}, props);
}
