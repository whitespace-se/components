export default function filterAttributes(props) {
  let attributes = {};
  Object.keys(props).forEach((key) => {
    if (key.charCodeAt(0) < 97) {
      return;
    }
    if (typeof props[key] === "object") {
      return;
    }
    switch (key) {
      case "components":
      case "as":
        return;
    }
    attributes[key] = props[key];
  });
  return attributes;
}
