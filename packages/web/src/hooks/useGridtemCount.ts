/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useBreakpoints } from "../components";

export const getGridItemCount = (breakpoint?: string) => {
  if (breakpoint === "XS") {
    return 1;
  } else if (breakpoint === "SM") {
    return 2;
  } else if (breakpoint === "MD") {
    return 3;
  }

  return 4;
};

export const useGridtemCount = () => {
  const { breakpoint } = useBreakpoints();

  return getGridItemCount(breakpoint);
};
