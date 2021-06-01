import * as React from "react";
import { TreeMenu } from "@whitespace/components";
import { useLocation } from "@gatsbyjs/reach-router";

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};
const headingAccentStyles = {
  color: "#663399",
};

// data

// markup
const IndexPage = () => {
  const location = useLocation();
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1 style={headingStyles}>
        Congratulations
        <br />
        <span style={headingAccentStyles}>— you just made a Gatsby site! </span>
        <span role="img" aria-label="Party popper emojis">
          🎉🎉🎉
        </span>
      </h1>
      <TreeMenu
        location={location}
        items={[
          { url: "/", label: "Home" },
          { url: "/other-page", label: "Other page" },
        ]}
      ></TreeMenu>
    </main>
  );
};

export default IndexPage;
