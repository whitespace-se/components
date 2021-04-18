import { useContext } from "react";
import themeContext from "../themeContext";

export default function useTheme() {
  return useContext(themeContext).theme;
}
