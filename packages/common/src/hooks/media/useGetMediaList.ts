/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { IMediaListOptionsModel } from "models";

import { useMediaListByIdSelector } from "../../selectors";
import { MediaStore } from "../../store";

type DefaultMediaListOptions = Omit<
  IMediaListOptionsModel,
  "MediaListId" | "PageNumber" | "PageSize"
>;

interface useGetMediaListParams {
  mediaListId: number;
  pageSize?: number;
  options?: DefaultMediaListOptions;
}

const DEFAULT_PAGE_SIZE = 12;
const DEFAULT_OPTIONS: DefaultMediaListOptions = {
  IncludeCategories: true,
  IncludeImages: true,
  IncludeMedia: false,
  IncludeCount: true,
};

export const useGetMediaList = (params: useGetMediaListParams) => {
  const {
    mediaListId,
    pageSize = DEFAULT_PAGE_SIZE,
    options = DEFAULT_OPTIONS,
  } = params;

  const dispatch = useDispatch();
  const mediaList = useMediaListByIdSelector(mediaListId);

  const isLoading = mediaList?.IsLoading || false;
  const pageNumber = mediaList?.Filter?.PageNumber || 1;
  const listLength = mediaList?.Entities?.length || 0;
  const haveNextPage =
    !isLoading && !!mediaList?.Entities && listLength < mediaList?.TotalCount;

  const getFirstPage = useCallback(() => {
    const isListEmpty =
      !mediaList ||
      (Object.keys(mediaList).length === 0 && mediaList.constructor === Object);

    if (isListEmpty && mediaListId !== 0) {
      dispatch(
        MediaStore.Actions.getMediaList({
          ...options,
          MediaListId: mediaListId,
          PageSize: pageSize,
          PageNumber: 1,
        })
      );
    }
  }, [dispatch, mediaList, mediaListId]);

  const getNextPage = useCallback(() => {
    if (mediaListId !== 0) {
      dispatch(
        MediaStore.Actions.getMediaList({
          ...options,
          MediaListId: mediaListId,
          PageSize: pageSize,
          PageNumber: pageNumber + 1,
        })
      );
    }
  }, [dispatch, mediaListId, pageNumber]);

  useEffect(() => {
    getFirstPage();
  }, [getFirstPage]);

  return {
    mediaList,
    isLoading,
    listLength,
    pageNumber,
    haveNextPage,
    getNextPage,
  };
};
