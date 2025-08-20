/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { IMediaOptionsModel } from "../../models";
import { useMediaByIdSelector } from "../../selectors";
import { MediaStore } from "../../store";

interface useGetMediaParams {
  mediaId: number;
  disableAutoFetch?: boolean;
  options?: Omit<IMediaOptionsModel, "MediaId">;
}

export const useGetMedia = (params: useGetMediaParams) => {
  const { mediaId, options, disableAutoFetch = false } = params;

  const { IsLoading, Error, Media } = useMediaByIdSelector(mediaId);

  const dispatch = useDispatch();

  const fetch = useCallback(
    () =>
      dispatch(
        MediaStore.Actions.getMedia({
          IncludeCategories: true,
          IncludeImages: true,
          IncludePeople: true,
          IncludeSimilarMedia: true,
          IncludeParent: true,
          MediaId: mediaId,
          ...options,
        })
      ),
    [mediaId]
  );

  useEffect(() => {
    !disableAutoFetch && fetch();
  }, [disableAutoFetch, fetch]);

  return {
    media: Media,
    error: Error,
    isLoading: IsLoading,
    isError: Boolean(Error),
    fetch,
  };
};
