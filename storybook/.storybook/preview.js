import { ThemeProvider, IconProvider, colors } from "@whitespace/components";
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
          color: colors
        }}
      >
        <IconProvider getIconSrc={(name) => `/icons/${name}.svg`}>
          {storyFn()}
        </IconProvider>
      </ThemeProvider>
    </LocationProvider>
  ),
];
