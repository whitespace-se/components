import { ThemeProvider } from "@whitespace/components/src";
import "./preview.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (storyFn) => (
    <ThemeProvider
      theme={{
        // button: {
        //   default: { background: "red" },
        //   active: { background: "green" },
        // },
        icon: {
          color: "red",
          size: "1em",
          verticalAlign: "-15%",
        },
      }}
    >
      {storyFn()}
    </ThemeProvider>
  ),
];
