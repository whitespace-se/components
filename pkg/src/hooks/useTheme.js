import { useContext } from "react";
import themeContext from "../contexts/themeContext";

export default function useTheme() {
  return useContext(themeContext).theme;
}
