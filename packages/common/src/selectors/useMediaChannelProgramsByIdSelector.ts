/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { shallowEqual, useSelector } from "react-redux";

import { IAppState } from "store";

export const useMediaChannelProgramsByIdSelector = (id: number) => {
  return useSelector(
    (state: IAppState) => state.media.channelPrograms[id] ?? {},
    shallowEqual
  );
};
