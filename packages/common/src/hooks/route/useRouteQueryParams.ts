/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useMemo } from "react";
import { useLocation } from "react-router";
import { Optional } from "utility-types";

import { UrlHelper } from "../../helpers";

export const useRouteQueryParams = <
  Parameters extends Record<string, unknown>
>() => {
  const location = useLocation();

  return useMemo((): Optional<Parameters> => {
    return UrlHelper.parse(location.search) as Optional<Parameters>;
  }, [location.search]);
};
