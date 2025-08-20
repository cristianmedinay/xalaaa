/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useRouteMatch } from "react-router";

export const useIdRouteParam = (): number => {
  const { params } = useRouteMatch<{ id: string }>();

  return +params.id ?? -1;
};
