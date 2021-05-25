import { useState } from "react";

export default function useSet(initialState = [], isEqual = (a, b) => a === b) {
  const [values, setValues] = useState(initialState);
  return [
    values,
    {
      has: (value) =>
        values.findIndex((otherValue) => isEqual(value, otherValue)) !== -1,
      add: (value) => {
        setValues((values) => {
          if (
            values.findIndex((otherValue) => isEqual(value, otherValue)) === -1
          ) {
            return [...values, value];
          }
          return values;
        });
      },
      delete: (value) => {
        setValues((values) => {
          let index = values.findIndex((otherValue) =>
            isEqual(value, otherValue),
          );
          if (index !== -1) {
            return [...values.slice(0, index), ...values.slice(index + 1)];
          }
          return values;
        });
      },
      toggle: (value) => {
        setValues((values, force = null) => {
          let index = values.findIndex((otherValue) =>
            isEqual(value, otherValue),
          );
          if (index !== -1 && force !== true) {
            return [...values.slice(0, index), ...values.slice(index + 1)];
          }
          if (index === -1 && force !== false) {
            return [...values, value];
          }
          return values;
        });
      },
    },
  ];
}
