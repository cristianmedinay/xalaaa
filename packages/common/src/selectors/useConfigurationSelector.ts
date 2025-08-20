/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { shallowEqual, useSelector } from "react-redux";

import { IAppState } from "../store/types";

export const useConfigurationSelector = () => {
  const configuration = useSelector(
    (state: IAppState) => state.configuration.configuration,
    shallowEqual
  );

  return configuration;
};
