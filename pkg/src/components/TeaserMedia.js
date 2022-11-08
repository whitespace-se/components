import DefaultImage from "./Image";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { withComponentDefaults } from "../utils";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./Teaser.module.css";

TeaserMedia.propTypes = {
  aspectRatio: PropTypes.number,
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.elementType),
  image: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(TeaserMedia, "teaserMedia");

function TeaserMedia({
  aspectRatio = 16 / 9,
  className,
  components: { Image = DefaultImage } = { Image: DefaultImage },
  image,
  styles = defaultStyles,
  ...restProps
}) {
  if (!image) {
    return null;
  }
  let attributes =
    typeof Image === "string" ? filterAttributes(restProps) : restProps;
  return (
    <Image
      {...image}
      className={clsx(styles.media, className)}
      {...attributes}
      caption={null}
      credit={null}
      aspectRatio={aspectRatio}
    />
  );
}
