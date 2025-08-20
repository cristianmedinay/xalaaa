/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { useMemo } from "react";

export const useStylesOnHover = (
  isActive: boolean | undefined,
  isHover: boolean,
  itemWidth?: number,
  margin?: number
) => {
  return useMemo(() => {
    if (isActive || isHover) {
      if (margin && itemWidth) {
        const scaleSize = (margin * 4 * 0.6) / itemWidth + 1;
        return {
          outline: "2px solid #3f8deadd",
          transform: `scale(${scaleSize})`,
          zIndex: 2,
        };
      }
      return {
        transform: `scale(1.05)`,
        zIndex: 2,
        outline: "2px solid #3f8deadd",
      };
    }

    return {
      transform: `scale(1)`,
      zIndex: 1,
    };
  }, [isActive, isHover, margin, itemWidth]);
};
