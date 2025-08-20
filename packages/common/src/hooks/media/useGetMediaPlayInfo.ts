/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { useCallback, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { MediaStreamType } from "../../enums";
import { IAppState, MediaStore } from "../../store";

interface useGetMediaPlayInfoParams {
  mediaId: number;
  streamType: MediaStreamType;
}

export const useGetMediaPlayInfo = (params: useGetMediaPlayInfoParams) => {
  const { mediaId, streamType } = params;

  const dispatch = useDispatch();

  const { Data, Error, IsProcessing } = useSelector(
    (state: IAppState) => state.media.mediaPlayInfo[mediaId] ?? {},
    shallowEqual
  );

  const fetch = useCallback(
    () =>
      dispatch(
        MediaStore.Actions.getMediaPlayInfo({
          MediaId: mediaId,
          StreamType: streamType,
        })
      ),
    [mediaId, streamType]
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    playInfo: Data,
    error: Error,
    isLoading: Boolean(IsProcessing),
    isError: Boolean(Error),
    fetch,
  };
};
