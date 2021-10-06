/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import clsx from "clsx";
import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";

import FormFieldDescription from "./FormFieldDescription";
import FormFieldError from "./FormFieldError";
import FormFieldLabel from "./FormFieldLabel";
import FormFieldWrapper from "./FormFieldWrapper";
import { useIconContext } from "./IconProvider";

import * as defaultStyles from "./FormSelectField.module.css";

FormSelectField.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.objectOf(PropTypes.string),
  icon: PropTypes.oneOfType([
    PropTypes.exact({
      name: PropTypes.string.isRequired,
    }),
    PropTypes.exact({
      src: PropTypes.string.isRequired,
    }),
  ]),
};

export default function FormSelectField({
  className,
  options,
  styles = defaultStyles,

  icon = { name: "chevron-down" },
  ...restProps
}) {
  const { getIconSrc } = useIconContext();
  return (
    <FormFieldWrapper
      className={clsx(styles.component, className)}
      css={css({
        "--form-select-icon": `url(${icon.src || getIconSrc(icon.name)})`,
      })}
      {...restProps}
    >
      {({ name, controlProps }) => (
        <React.Fragment>
          <FormFieldLabel className={styles.label} />
          <FormFieldDescription className={styles.description} />
          <FormFieldError className={styles.error} />
          <div className={styles.control}>
            <Field
              as="select"
              className={styles.select}
              name={name}
              {...controlProps}
            >
              <option value="">Välj ett alternativ</option>
              {options
                ? options.map((option) => {
                    return (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    );
                  })
                : null}
            </Field>
          </div>
        </React.Fragment>
      )}
    </FormFieldWrapper>
  );
}
