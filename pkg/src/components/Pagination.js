import cx from "classnames";
import React from "react";
import PropTypes from "prop-types";

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
    <nav className={cx(styles.component, className)} {...restProps}>
      <ul className={styles.list}>
        <li
          className={cx(styles.item, styles.previous)}
          ariaLabel={t("Previous page")}
        >
          <Button
            className={styles.button}
            url={!isFirstPage ? buttonUrl && buttonUrl(page - 1) : undefined}
            disabled={isFirstPage}
            components={{ InertElement: "span" }}
            ariaLabel={t("Previous page")}
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
          const pageButtonAriaLabel = `${t("Page")} ${pageIndex + 1}`;
          return (
            <li
              className={cx(
                styles.item,
                pageIndex === page && styles.current,
                index === 0 && styles.firstInRange,
                index + 1 === pagesToDisplay.length && styles.lastInRange,
              )}
              key={pageIndex}
              ariaLabel={pageButtonAriaLabel}
            >
              <Button
                className={styles.button}
                url={buttonUrl && buttonUrl(pageIndex)}
                aria-current={pageIndex == page ? "page" : null}
                ariaLabel={pageButtonAriaLabel}
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
        <li className={cx(styles.item, styles.next)} ariaLabel={t("Next page")}>
          <Button
            className={styles.button}
            url={!isLastPage ? buttonUrl && buttonUrl(page + 1) : undefined}
            disabled={isLastPage}
            components={{ InertElement: "span" }}
            ariaLabel={t("Next page")}
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
