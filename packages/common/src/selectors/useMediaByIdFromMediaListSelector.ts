/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useSelector } from "react-redux";

import { IMediaModel } from "../models";
import { IAppState } from "../store";

export const useMediaByIdFromMediaListSelector = (
  mediaId: string | number,
  mediaListId: string | number
) => {
  return useSelector<IAppState, IMediaModel | undefined>((state: IAppState) =>
    state.media.mediaList[mediaListId]?.Entities?.find(
      (media) => media.Id === mediaId
    )
  );
};
