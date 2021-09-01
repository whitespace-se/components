import { useState, useCallback, useLayoutEffect, useRef } from "react";

function getWidth(el, defaultWidth) {
  if (!el) {
    return defaultWidth;
  }
  return el.clientWidth;
}

export default function useComponentWidth(defaultWidth = 0) {
  const ref = useRef();
  const [width, setWidth] = useState(getWidth(ref.current, defaultWidth));

  var handleResize = useCallback(() => {
    if (ref.current) {
      setWidth(getWidth(ref.current, defaultWidth));
    }
  }, []);

  useLayoutEffect(
    function () {
      if (!ref.current) {
        return;
      }
      handleResize();
      if (typeof ResizeObserver === "function") {
        var resizeObserver = new ResizeObserver(function () {
          handleResize();
        });
        let el = ref.current;
        resizeObserver.observe(el);
        return () => {
          resizeObserver.disconnect(el);
          resizeObserver = null;
        };
      } else {
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    },
    [ref],
  );

  return [width, ref];
}
