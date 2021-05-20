import useTheme from "./useTheme";
import mergeProps from "../utils/mergeProps";

export default function useComponentDefaults(namespace, props) {
  let theme = useTheme();
  let globalDefaults = theme["default"];
  let componentDefaults = theme[namespace];
  if (!componentDefaults && !globalDefaults) {
    return props;
  }
  return mergeProps(globalDefaults || {}, componentDefaults || {}, props);
}
