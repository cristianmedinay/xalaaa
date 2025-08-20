/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { debounce } from "debounce";
import React, { useEffect, useState } from "react";
export const useElementSize = (ref: React.RefObject<HTMLDivElement>) => {
  const [itemWidth, setItemWidth] = useState(0);

  const RESIZE_DEBOUNCE_MS = 200;

  useEffect(() => {
    const handleResize = debounce(() => {
      setItemWidth(ref.current?.offsetWidth || 0);
    }, RESIZE_DEBOUNCE_MS);
    if (ref.current) {
      handleResize();
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref, ref?.current?.offsetWidth]);

  return itemWidth;
};
