import PropTypes from "prop-types";
import React from "react";
import urlTransformerContext from "../contexts/urlTransformerContext";

export default function URLTransformerProvider({
  children,
  transformURL,
  ...restProps
}) {
  return (
    <urlTransformerContext.Provider value={{ transformURL, ...restProps }}>
      {children}
    </urlTransformerContext.Provider>
  );
}

URLTransformerProvider.propTypes = {
  children: PropTypes.node,
  transformURL: PropTypes.func.isRequired,
};
