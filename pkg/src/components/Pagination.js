import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { filterAttributes } from "../utils";

import Icon from "./Icon";
import DefaultButton from "./Button";
import { visuallyHidden } from "../utils/styles.module.css";
import * as defaultStyles from "./Pagination.module.css";

const defaultLabels = {};

Pagination.propTypes = {
  buttonUrl: PropTypes.func,
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.elementType),
  onButtonClick: PropTypes.func,
  page: PropTypes.number.isRequired,
  range: PropTypes.number,
  styles: PropTypes.objectOf(PropTypes.string),
  t: PropTypes.func,
  totalPages: PropTypes.number.isRequired,
};

export default function Pagination({
  buttonUrl,
  className,
  components: { Button = DefaultButton } = { Button: DefaultButton },
  onButtonClick,
  page,
  range = 5,
  styles = defaultStyles,
  t = (id) => defaultLabels[id] || id,
  totalPages,
  ...restProps
}) {
  let attributes = filterAttributes(restProps);
  const isFirstPage = page === 0;
  const isLastPage = page === totalPages - 1;
  let pagesToDisplay;
  if (totalPages > range) {
    let min = Math.min(
      totalPages - range,
      Math.max(0, page - Math.floor(range / 2)),
    );
    pagesToDisplay = Array.from({ length: range }, (v, i) => min + i);
  } else {
    pagesToDisplay = Array.from({ length: totalPages }, (v, i) => i);
  }

  return (
    <nav className={clsx(styles.component, className)} {...attributes}>
      <ul className={styles.list}>
        <li className={clsx(styles.item, styles.previous)}>
          <Button
            className={styles.button}
            url={!isFirstPage ? buttonUrl && buttonUrl(page - 1) : undefined}
            disabled={isFirstPage}
            components={{ InertElement: "span" }}
            onClick={
              onButtonClick &&
              (() => {
                if (!isFirstPage) {
                  onButtonClick(page - 1);
                }
              })
            }
          >
            <Icon name="arrow-left" />
            <span className={styles.itemText}>{t("previousPage")}</span>
          </Button>
        </li>
        {pagesToDisplay.map((pageIndex, index) => {
          return (
            <li
              className={clsx(
                styles.item,
                pageIndex === page && styles.current,
                index === 0 && styles.firstInRange,
                index + 1 === pagesToDisplay.length && styles.lastInRange,
              )}
              key={pageIndex}
            >
              <Button
                className={styles.button}
                url={buttonUrl && buttonUrl(pageIndex)}
                aria-current={pageIndex == page ? "page" : null}
                onClick={
                  onButtonClick &&
                  (() => {
                    onButtonClick(pageIndex);
                  })
                }
              >
                <span className={visuallyHidden}>{t("page")}: </span>
                {pageIndex + 1}
              </Button>
            </li>
          );
        })}
        <li className={clsx(styles.item, styles.next)}>
          <Button
            className={styles.button}
            url={!isLastPage ? buttonUrl && buttonUrl(page + 1) : undefined}
            disabled={isLastPage}
            components={{ InertElement: "span" }}
            onClick={
              onButtonClick &&
              (() => {
                if (!isLastPage) {
                  onButtonClick(page + 1);
                }
              })
            }
          >
            <span className={styles.itemText}>{t("nextPage")}</span>
            <Icon name="arrow-right" />
          </Button>
        </li>
      </ul>
    </nav>
  );
}
