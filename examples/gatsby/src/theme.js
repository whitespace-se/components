import { Link as GatsbyLink } from "gatsby";
import React from "react";

function InternalLinkElement({ href, ...props }) {
  return <GatsbyLink to={href} {...props}></GatsbyLink>;
}

export default {
  link: {
    components: {
      InternalLinkElement,
    },
  },
};
