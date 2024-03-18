import useID from "../hooks/useID";
import clsx from "clsx";
import { useField } from "formik";
import PropTypes from "prop-types";
import React from "react";

import formFieldContext from "../contexts/formFieldContext";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./FormFieldWrapper.module.css";

FormFieldWrapper.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  description: PropTypes.node,
  hideLabel: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  styles: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string,
};

export default function FormFieldWrapper({
  as: Component = "div",
  children,
  className,
  description,
  hideLabel = false,
  label,
  name,
  required,
  styles = defaultStyles,
  id: idProp,
  ...restProps
}) {
  const id = useID(idProp || name);
  const [input, meta, helpers] = useField({ name, multiple: true });
  let attributes =
    typeof Component === "string" ? filterAttributes(restProps) : restProps;

  const context = {
    description,
    helpers,
    hideLabel,
    id,
    input,
    label,
    meta,
    name,
    required,
    controlProps: {
      required,
      "aria-controls": id(`errors`),
      "aria-required": required,
      "aria-invalid": meta.touched && meta.error,
      "aria-describedby": description && id(`description`),
    },
  };

  return (
    <Component
      className={clsx(
        styles.component,
        required && styles.required,
        meta.error && meta.touched && styles.error,
        className,
      )}
      {...attributes}
    >
      <formFieldContext.Provider value={context}>
        {children(context)}
      </formFieldContext.Provider>
    </Component>
  );
}
