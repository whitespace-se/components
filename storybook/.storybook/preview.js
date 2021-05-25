import { ThemeProvider } from "@whitespace/components";
import React from "react";
import { LocationProvider, InternalLinkElement } from "../mocks/location";

import "./preview.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (storyFn) => (
    <LocationProvider>
      <ThemeProvider
        theme={{
          link: { components: { InternalLinkElement } },
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
    </LocationProvider>
  ),
];
