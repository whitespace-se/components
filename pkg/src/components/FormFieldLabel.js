import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import useFormField from "../hooks/useFormField";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./FormFieldLabel.module.css";

import { visuallyHidden } from "../utils/styles.module.css";

FormFieldLabel.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function FormFieldLabel({
  as: Component = "label",
  className,
  styles = defaultStyles,
  ...restProps
}) {
  const { id, label, name, required, hideLabel } = useFormField();
  let attributes =
    typeof Component === "string" ? filterAttributes(restProps) : restProps;
  return (
    <Component
      className={clsx(
        styles.component,
        required && styles.required,
        hideLabel && visuallyHidden,
        className,
      )}
      htmlFor={Component === "label" ? id(name) : undefined}
      {...attributes}
    >
      {label}
    </Component>
  );
}
