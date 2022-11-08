import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

import * as defaultStyles from "./CalendarBadge.module.css";

import withComponentDefaults from "../utils/withComponentDefaults";
import { filterAttributes } from "../utils";

CalendarBadge.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  locale: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};

export default withComponentDefaults(CalendarBadge, "calendarBadge");

function CalendarBadge({
  className,
  styles = defaultStyles,
  locale,
  date,
  ...restProps
}) {
  let attributes = filterAttributes(restProps);
  const month = date.toLocaleDateString(locale, { month: "short" });
  const day = date.toLocaleDateString(locale, { day: "numeric" });

  return (
    <div className={clsx(styles.component, className)} {...attributes}>
      <div className={clsx(styles.day)} aria-hidden>
        {day}
      </div>
      <div className={clsx(styles.month)} aria-hidden>
        {month}
      </div>
    </div>
  );
}
