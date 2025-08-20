/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IErrorModel,
  IMediaCategoryListModel,
  IMediaChannelProgramOptionsModel,
  IMediaChannelsForUserModel,
  IMediaListModel,
  IMediaListOptionsModel,
  IMediaModel,
  IMediaOptionsModel,
  IMediaPlayInfoModel,
  IMediaPlayInfoOptionsModel,
  IMediaPurchaseOfferModel,
  IMediaSearchFilterModel,
  IMediaSearchMediaInMediaFilterModel,
  IMediaSearchStateModel,
} from "../../models";

import * as Consts from "./consts";
import {
  IAddToFavouritesListAction,
  IClearMediaAction,
  IGetMediaAction,
  IGetMediaCategoriesAction,
  IGetMediaCategoriesFailureAction,
  IGetMediaCategoriesSuccessAction,
  IGetMediaChannelProgramsAction,
  IGetMediaChannelProgramsFailureAction,
  IGetMediaChannelProgramsSuccessAction,
  IGetMediaChannelsForUserAction,
  IGetMediaChannelsForUserFailureAction,
  IGetMediaChannelsForUserSuccessAction,
  IGetMediaFailureAction,
  IGetMediaListAction,
  IGetMediaListFailureAction,
  IGetMediaListForEpgAction,
  IGetMediaListForEpgFailureAction,
  IGetMediaListForEpgSuccessAction,
  IGetMediaListFromCacheAction,
  IGetMediaListFromCacheFailureAction,
  IGetMediaListFromCacheSuccessAction,
  IGetMediaListSuccessAction,
  IGetMediaPlayInfoAction,
  IGetMediaPlayInfoFailureAction,
  IGetMediaPlayInfoSuccessAction,
  IGetMediaSuccessAction,
  IRemoveFromFavouritesListAction,
  ISearchMediaAction,
  ISearchMediaFailureAction,
  ISearchMediaInMediaAction,
  ISearchMediaInMediaFailureAction,
  ISearchMediaInMediaSuccessAction,
  ISearchMediaSuccessAction,
  ISelectMediaPurchaseOffersAction,
  ISelectMediaPurchaseOffersFailureAction,
  ISelectMediaPurchaseOffersSuccessAction,
} from "./types";

export const getMedia = (options: IMediaOptionsModel): IGetMediaAction => {
  return {
    options,
    type: Consts.GET_MEDIA,
  };
};

export const getMediaSuccess = (data: IMediaModel): IGetMediaSuccessAction => {
  return {
    payload: data,
    type: Consts.GET_MEDIA_SUCCESS,
  };
};

export const getMediaFailure = (
  mediaId: number,
  error?: IErrorModel
): IGetMediaFailureAction => {
  return {
    mediaId,
    error,
    type: Consts.GET_MEDIA_FAILURE,
  };
};
export const getMediaPlayInfo = (
  options: IMediaPlayInfoOptionsModel
): IGetMediaPlayInfoAction => {
  return {
    options,
    type: Consts.GET_MEDIA_PLAY_INFO,
  };
};

export const getMediaPlayInfoSuccess = (
  options: IMediaPlayInfoOptionsModel,
  data: IMediaPlayInfoModel
): IGetMediaPlayInfoSuccessAction => {
  return {
    options,
    payload: data,
    type: Consts.GET_MEDIA_PLAY_INFO_SUCCESS,
  };
};

export const getMediaPlayInfoFailure = (
  options: IMediaPlayInfoOptionsModel,
  error?: IErrorModel
): IGetMediaPlayInfoFailureAction => {
  return {
    options,
    error,
    type: Consts.GET_MEDIA_PLAY_INFO_FAILURE,
  };
};

export const searchMedia = (
  filter: IMediaSearchFilterModel
): ISearchMediaAction => {
  return {
    filter,
    type: Consts.SEARCH_MEDIA,
  };
};

export const searchMediaSuccess = (
  data: IMediaSearchStateModel
): ISearchMediaSuccessAction => {
  return {
    payload: data,
    type: Consts.SEARCH_MEDIA_SUCCESS,
  };
};

export const searchMediaFailure = (
  error?: IErrorModel
): ISearchMediaFailureAction => {
  return {
    error,
    type: Consts.SEARCH_MEDIA_FAILURE,
  };
};

export const searchMediaInMedia = (
  filter: IMediaSearchMediaInMediaFilterModel
): ISearchMediaInMediaAction => {
  return {
    filter,
    type: Consts.SEARCH_MEDIA_IN_MEDIA,
  };
};

export const searchMediaInMediaSuccess = (
  filter: IMediaSearchMediaInMediaFilterModel,
  data: IMediaListModel
): ISearchMediaInMediaSuccessAction => {
  return {
    filter,
    payload: data,
    type: Consts.SEARCH_MEDIA_IN_MEDIA_SUCCESS,
  };
};

export const searchMediaInMediaFailure = (
  filter: IMediaSearchMediaInMediaFilterModel,
  error?: IErrorModel
): ISearchMediaInMediaFailureAction => {
  return {
    error,
    filter,
    type: Consts.SEARCH_MEDIA_IN_MEDIA_FAILURE,
  };
};

export const getMediaList = (
  options: IMediaListOptionsModel
): IGetMediaListAction => {
  return {
    options,
    type: Consts.GET_MEDIA_LIST,
  };
};

export const getMediaListSuccess = (
  mediaListId: number,
  data: IMediaListModel
): IGetMediaListSuccessAction => {
  return {
    mediaListId,
    payload: data,
    type: Consts.GET_MEDIA_LIST_SUCCESS,
  };
};

export const getMediaListFailure = (
  mediaListId: number,
  error?: IErrorModel
): IGetMediaListFailureAction => {
  return {
    mediaListId,
    error,
    type: Consts.GET_MEDIA_LIST_FAILURE,
  };
};

export const getMediaListFromCache = (
  options: IMediaListOptionsModel
): IGetMediaListFromCacheAction => {
  return {
    options,
    type: Consts.GET_MEDIA_LIST_FROM_CACHE,
  };
};

export const getMediaListFromCacheSuccess = (
  mediaListId: number,
  data: IMediaListModel
): IGetMediaListFromCacheSuccessAction => {
  return {
    mediaListId,
    payload: data,
    type: Consts.GET_MEDIA_LIST_FROM_CACHE_SUCCESS,
  };
};

export const getMediaListFromCacheFailure = (
  mediaListId: number,
  error?: IErrorModel
): IGetMediaListFromCacheFailureAction => {
  return {
    mediaListId,
    error,
    type: Consts.GET_MEDIA_LIST_FROM_CACHE_FAILURE,
  };
};

export const getMediaListForEpg = (
  options: IMediaListOptionsModel
): IGetMediaListForEpgAction => {
  return {
    options,
    type: Consts.GET_MEDIA_LIST_FOR_EPG,
  };
};

export const getMediaListForEpgSuccess = (
  mediaListId: number,
  options: IMediaListOptionsModel,
  data: IMediaListModel
): IGetMediaListForEpgSuccessAction => {
  return {
    mediaListId,
    options,
    payload: data,
    type: Consts.GET_MEDIA_LIST_FOR_EPG_SUCCESS,
  };
};

export const getMediaListForEpgFailure = (
  mediaListId: number,
  options: IMediaListOptionsModel,
  error?: IErrorModel
): IGetMediaListForEpgFailureAction => {
  return {
    mediaListId,
    options,
    error,
    type: Consts.GET_MEDIA_LIST_FOR_EPG_FAILURE,
  };
};

export const getMediaCategories = (): IGetMediaCategoriesAction => {
  return {
    type: Consts.GET_MEDIA_CATEGORIES,
  };
};

export const getMediaCategoriesSuccess = (
  data: IMediaCategoryListModel
): IGetMediaCategoriesSuccessAction => {
  return {
    payload: data,
    type: Consts.GET_MEDIA_CATEGORIES_SUCCESS,
  };
};

export const getMediaCategoriesFailure = (
  error?: IErrorModel
): IGetMediaCategoriesFailureAction => {
  return {
    error,
    type: Consts.GET_MEDIA_CATEGORIES_FAILURE,
  };
};

export const selectMediaPurchaseOffers = (
  mediaId: number
): ISelectMediaPurchaseOffersAction => {
  return {
    mediaId,
    type: Consts.SELECT_MEDIA_PURCHASE_OFFERS,
  };
};

export const selectMediaPurchaseOffersSuccess = (
  mediaId: number,
  data: IMediaPurchaseOfferModel[]
): ISelectMediaPurchaseOffersSuccessAction => {
  return {
    mediaId,
    payload: data,
    type: Consts.SELECT_MEDIA_PURCHASE_OFFERS_SUCCESS,
  };
};

export const selectMediaPurchaseOffersFailure = (
  mediaId: number,
  error?: IErrorModel
): ISelectMediaPurchaseOffersFailureAction => {
  return {
    error,
    mediaId,
    type: Consts.SELECT_MEDIA_PURCHASE_OFFERS_FAILURE,
  };
};

export const clearMedia = (): IClearMediaAction => ({
  type: Consts.CLEAR_MEDIA,
});

export const removeFromFavoritesListAction = (
  mediaId: string | number
): IRemoveFromFavouritesListAction => {
  return {
    type: Consts.REMOVE_FROM_FAVORITES_LIST,
    mediaId: mediaId,
  };
};

export const addToFavoritesListAction = (
  media: IMediaModel
): IAddToFavouritesListAction => {
  return {
    type: Consts.ADD_TO_FAVORITES_LIST,
    media: media,
  };
};

export const getMediaChannelsForUser = (): IGetMediaChannelsForUserAction => {
  return {
    type: Consts.GET_MEDIA_CHANNELS_FOR_USER,
  };
};

export const getMediaChannelsForUserSuccess = (
  data: Partial<IMediaChannelsForUserModel>[]
): IGetMediaChannelsForUserSuccessAction => {
  return {
    payload: data,
    type: Consts.GET_MEDIA_CHANNELS_FOR_USER_SUCCESS,
  };
};

export const getMediaChannelsForUserFailure = (
  error?: IErrorModel
): IGetMediaChannelsForUserFailureAction => {
  return {
    error,
    type: Consts.GET_MEDIA_CHANNELS_FOR_USER_FAILURE,
  };
};

export const getMediaChannelPrograms = (
  options: IMediaChannelProgramOptionsModel
): IGetMediaChannelProgramsAction => {
  return {
    options,
    type: Consts.GET_MEDIA_CHANNEL_PROGRAMS,
  };
};

export const getMediaChannelProgramsSuccess = (
  channelIds: number[],
  data: IMediaListModel
): IGetMediaChannelProgramsSuccessAction => {
  return {
    channelIds,
    payload: data,
    type: Consts.GET_MEDIA_CHANNEL_PROGRAMS_SUCCESS,
  };
};

export const getMediaChannelProgramsFailure = (
  channelIds: number[],
  error?: IErrorModel
): IGetMediaChannelProgramsFailureAction => {
  return {
    channelIds,
    error,
    type: Consts.GET_MEDIA_CHANNEL_PROGRAMS_FAILURE,
  };
};

export const Actions = {
  getMedia,
  getMediaPlayInfo,
  getMediaList,
  getMediaListFromCache,
  getMediaCategories,
  searchMedia,
  searchMediaInMedia,
  getMediaListForEpg,
  selectMediaPurchaseOffers,
  clearMedia,
  addToFavoritesListAction,
  removeFromFavoritesListAction,
  getMediaChannelsForUser,
  getMediaChannelPrograms,
  getMediaChannelProgramsSuccess,
  getMediaChannelProgramsFailure,
};
