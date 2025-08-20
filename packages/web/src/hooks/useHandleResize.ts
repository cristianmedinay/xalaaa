/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { debounce } from "debounce";
import { useEffect, useState } from "react";

export const useHandleResize = (debounceTimeMs = 200) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateDimensions = debounce(() => {
      setWidth(innerWidth);
    }, debounceTimeMs);
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [debounceTimeMs]);

  return width;
};
