import { ThemeProvider } from "../../pkg/src";
import "./preview.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (storyFn) => (
    <ThemeProvider
      theme={
        {
          // button: {
          //   default: { background: "red" },
          //   active: { background: "green" },
          // },
        }
      }
    >
      {storyFn()}
    </ThemeProvider>
  ),
];
