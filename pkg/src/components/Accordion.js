// Ref: https://www.aditus.io/patterns/accordion/

import { H } from "@jfrk/react-heading-levels";
import clsx from "clsx";
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Icon } from "@whitespace/components";

import { useID } from "../hooks";
// import { navigateOnKeyUp } from "../../../../utils/keyboardNavigation";

import * as defaultStyles from "./Accordion.module.css";
import withComponentDefaults from "../withComponentDefaults";

Accordion.propTypes = {
  components: PropTypes.objectOf(PropTypes.elementType),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      content: PropTypes.node,
    }),
  ).isRequired,
  icons: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default withComponentDefaults(Accordion, "accordion");

const DefaultExpandIcon = (props) => <Icon name="chevron-down" {...props} />;
const DefaultCollapseIcon = (props) => <Icon name="chevron-up" {...props} />;

function Accordion({
  components: {
    ExpandIcon = DefaultExpandIcon,
    CollapseIcon = DefaultCollapseIcon,
  } = {
    ExpandIcon: DefaultExpandIcon,
    CollapseIcon: DefaultCollapseIcon,
  },
  items,
  styles = defaultStyles,
  className,
  ...restProps
}) {
  const [expandedRowIndexes, setExpandedRowIndexes] = useState([]);
  const id = useID();

  function isExpanded(index) {
    return expandedRowIndexes.indexOf(index) !== -1;
  }

  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      <ul className={clsx(styles.list)} id={id(`accordion`)}>
        {items.map((row, index) => {
          return (
            <li className={clsx(styles.item)} key={index}>
              <H className={clsx(styles.title)}>
                <button
                  id={id(`accordion-header-${index}`)}
                  aria-expanded={isExpanded(index)}
                  aria-controls={id(`accordion-panel-${index}`)}
                  className={clsx(styles.button)}
                  onClick={() => {
                    if (!isExpanded(index)) {
                      setExpandedRowIndexes([...expandedRowIndexes, index]);
                    } else {
                      setExpandedRowIndexes(
                        expandedRowIndexes.filter(
                          (currIndex) => currIndex !== index,
                        ),
                      );
                    }
                  }}
                >
                  <span className={clsx(styles.icon)} aria-hidden="true">
                    {!isExpanded(index) ? <ExpandIcon /> : <CollapseIcon />}
                  </span>
                  {row.title}
                </button>
              </H>
              <section
                id={id(`accordion-panel-${index}`)}
                aria-labelledby={id(`accordion-header-${index}`)}
                hidden={!isExpanded(index)}
                className={clsx(styles.content)}
              >
                {row.content}
              </section>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
