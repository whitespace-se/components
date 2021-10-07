/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import clsx from "clsx";
import { Field } from "formik";
import PropTypes from "prop-types";

import * as defaultStyles from "./FormCheckboxField.module.css";
import FormFieldDescription from "./FormFieldDescription";
import FormFieldError from "./FormFieldError";
import FormFieldLabel from "./FormFieldLabel";
import FormFieldWrapper from "./FormFieldWrapper";
import { useIconContext } from "./IconProvider";

FormCheckboxField.propTypes = {
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

export default function FormCheckboxField({
  className,
  options,
  styles = defaultStyles,
  icon = { name: "checkmark" },
  ...restProps
}) {
  const { getIconSrc } = useIconContext();
  return (
    <FormFieldWrapper
      className={clsx(styles.component, className)}
      css={css({
        "--form-checkbox-image": `url(${icon.src || getIconSrc(icon.name)})`,
      })}
      {...restProps}
    >
      {({ controlProps, name }) => (
        <fieldset className={styles.control} {...controlProps}>
          <FormFieldLabel as="legend" className={styles.label} />
          <FormFieldDescription className={styles.description} />
          <FormFieldError className={styles.error} />
          <div className={styles.list}>
            {options.map((option) => {
              return (
                <label className={styles.itemLabel} key={option}>
                  <Field
                    className={styles.item}
                    type="checkbox"
                    name={name}
                    value={option}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}
    </FormFieldWrapper>
  );
}
