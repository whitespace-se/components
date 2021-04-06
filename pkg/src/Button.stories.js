/* eslint-disable react/prop-types */
import React from "react";
import Button from "./Button";

import { visuallyHidden } from "./utils.module.css";

export const withHref = ({ text, ...args }) => (
  <Button {...args}>{text}</Button>
);
withHref.args = { text: "Example", href: "#example" };
withHref.storyName = "With href";

export const withOnClick = ({ text, ...args }) => (
  <Button {...args}>{text}</Button>
);
withOnClick.args = { text: "Example", onClick: () => {} };
withOnClick.storyName = "With onClick handler";
withOnClick.parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const submitButton = ({ text, ...args }) => (
  <Button {...args}>{text}</Button>
);
submitButton.args = { text: "Submit", type: "submit" };
submitButton.storyName = "Form submit";

export const resetButton = ({ text, ...args }) => (
  <Button {...args}>{text}</Button>
);
resetButton.args = { text: "Reset", type: "reset" };
resetButton.storyName = "Form reset";

export const checkboxLabel = ({ text, ...args }) => (
  <>
    <input type="checkbox" className={visuallyHidden} id="example-checkbox" />
    <Button {...args} htmlFor="example-checkbox">
      {text}
    </Button>
  </>
);
checkboxLabel.args = { text: "Toggle?" };
checkboxLabel.storyName = "Toggle button with checkbox";

export const radioLabel = ({ ...args }) => (
  <>
    <input
      type="radio"
      className={visuallyHidden}
      id="radio-a"
      name="radios"
      value="A"
      checked={true}
    />
    <Button {...args} htmlFor="radio-a">
      Option A
    </Button>{" "}
    <input
      type="radio"
      className={visuallyHidden}
      id="radio-b"
      name="radios"
      value="B"
    />
    <Button {...args} htmlFor="radio-b">
      Option B
    </Button>
  </>
);
radioLabel.args = {};
radioLabel.storyName = "Toggle buttons with radios";

/* 

<Canvas>
  <Story
    name="Label for checkbox"
    args={{ text: "Example" }}
    parameters={{
      actions: { argTypesRegex: "^on[A-Z].*" },
    }}
  >
    {CheckboxTemplate.bind({})}
  </Story>
</Canvas>

<Canvas>
  <Story
    name="Label for radio"
    args={{ text: "Example" }}
    parameters={{
      actions: { argTypesRegex: "^on[A-Z].*" },
    }}
  >
    {RadioTemplate.bind({})}
  </Story>
</Canvas>

<Canvas>
  <Story name="Inert" args={{ text: "Example" }}>
    {Template.bind({})}
  </Story>
</Canvas> */
