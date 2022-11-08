import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import useFormField from "../hooks/useFormField";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./FormFieldDescription.module.css";

FormFieldDescription.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function FormFieldDescription({
  as: Component = "p",
  className,
  styles = defaultStyles,
  ...restProps
}) {
  const { description, id } = useFormField();
  if (!description) {
    return null;
  }
  let attributes =
    typeof Component === "string" ? filterAttributes(restProps) : restProps;
  return (
    <Component
      className={clsx(styles.component, className)}
      id={id(`description`)}
      {...attributes}
    >
      {description}
    </Component>
  );
}
