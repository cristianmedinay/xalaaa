/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { shallowEqual, useSelector } from "react-redux";

import { IAppState } from "../store";

export const useMediaByIdSelector = (id: string | number) => {
  return useSelector(
    (state: IAppState) => state.media.media[id] ?? {},
    shallowEqual
  );
};
