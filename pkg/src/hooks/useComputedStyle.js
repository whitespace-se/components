import { useEffect, useRef, useState } from "react";

function requestAnimationFrameInterval(callback) {
  let handle;
  function loop() {
    callback();
    handle = window.requestAnimationFrame(loop);
  }
  handle = window.requestAnimationFrame(loop);
  return () => {
    if (handle != null) {
      window.cancelAnimationFrame(handle);
    }
    handle = null;
  };
}

export default function useComputedStyle(prop, ...args) {
  const ref = useRef();
  const [value, setValue] = useState();
  useEffect(
    () =>
      requestAnimationFrameInterval(() => {
        setValue(
          ref.current && window.getComputedStyle(ref.current, ...args)[prop],
        );
      }),
    [],
  );
  return [ref, value];
}
