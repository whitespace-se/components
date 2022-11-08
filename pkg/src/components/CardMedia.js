import DefaultImage from "./Image";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { withComponentDefaults } from "../utils";
import { filterAttributes } from "../utils";

import * as defaultStyles from "./Card.module.css";

CardMedia.propTypes = {
  aspectRatio: PropTypes.number,
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.elementType),
  image: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(CardMedia, "cardMedia");

function CardMedia({
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
  let attributes = filterAttributes(restProps);
  return (
    <>
      <Image
        {...image}
        className={clsx(styles.media, className)}
        {...attributes}
        caption={null}
        credit={null}
        aspectRatio={aspectRatio}
      />
      <div className={styles.dummy} />
    </>
  );
}
