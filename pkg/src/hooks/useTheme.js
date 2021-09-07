import { useContext } from "react";
import { themeContext } from "../contexts";

export default function useTheme() {
  return useContext(themeContext).theme;
}
