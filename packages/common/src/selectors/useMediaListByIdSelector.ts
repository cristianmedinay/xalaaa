/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { shallowEqual, useSelector } from "react-redux";

import { IAppState } from "../store/types";

export const useMediaListByIdSelector = (id: string | number) => {
  const mediaList = useSelector(
    (state: IAppState) => state.media.mediaList[id] ?? {},
    shallowEqual
  );

  return mediaList;
};
