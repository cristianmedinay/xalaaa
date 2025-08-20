/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IErrorModel,
  IMediaCategoryListModel,
  IMediaChannelProgramModel,
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
  IMediaStateModel,
  IStateModel,
} from "../../models";

import * as Consts from "./consts";

export interface IMediaState {
  action?: MediaActionsTypes;
  error?: IErrorModel;
  media: { [key: string]: IMediaStateModel };
  mediaPlayInfo: { [key: string]: IStateModel<IMediaPlayInfoModel> };
  mediaList: { [key: string]: IMediaListModel };
  epg: { [key: string]: IMediaListModel };
  channelList: IMediaListModel;
  channelPrograms: { [key: string]: IMediaChannelProgramModel };
  mediaCategories: IMediaCategoryListModel;
  mediaSearch: IMediaSearchStateModel;
  mediaPurchaseOffers: {
    [id: string]: IStateModel<IMediaPurchaseOfferModel[]>;
  };
}

export interface IGetMediaAction {
  options: IMediaOptionsModel;
  type: typeof Consts.GET_MEDIA;
}

export interface IGetMediaSuccessAction {
  type: typeof Consts.GET_MEDIA_SUCCESS;
  payload: IMediaModel;
}

export interface IGetMediaFailureAction {
  mediaId: number;
  type: typeof Consts.GET_MEDIA_FAILURE;
  error?: IErrorModel;
}

export interface IGetMediaPlayInfoAction {
  options: IMediaPlayInfoOptionsModel;
  type: typeof Consts.GET_MEDIA_PLAY_INFO;
}

export interface IGetMediaPlayInfoSuccessAction {
  type: typeof Consts.GET_MEDIA_PLAY_INFO_SUCCESS;
  options: IMediaPlayInfoOptionsModel;
  payload: IMediaPlayInfoModel;
}

export interface IGetMediaPlayInfoFailureAction {
  options: IMediaPlayInfoOptionsModel;
  type: typeof Consts.GET_MEDIA_PLAY_INFO_FAILURE;
  error?: IErrorModel;
}

export interface ISearchMediaAction {
  filter: IMediaSearchFilterModel;
  type: typeof Consts.SEARCH_MEDIA;
}

export interface ISearchMediaSuccessAction {
  payload: IMediaSearchStateModel;
  type: typeof Consts.SEARCH_MEDIA_SUCCESS;
}

export interface ISearchMediaFailureAction {
  error?: IErrorModel;
  type: typeof Consts.SEARCH_MEDIA_FAILURE;
}

export interface ISearchMediaInMediaAction {
  filter: IMediaSearchMediaInMediaFilterModel;
  type: typeof Consts.SEARCH_MEDIA_IN_MEDIA;
}

export interface ISearchMediaInMediaSuccessAction {
  filter: IMediaSearchMediaInMediaFilterModel;
  payload: IMediaListModel;
  type: typeof Consts.SEARCH_MEDIA_IN_MEDIA_SUCCESS;
}

export interface ISearchMediaInMediaFailureAction {
  error?: IErrorModel;
  filter: IMediaSearchMediaInMediaFilterModel;
  type: typeof Consts.SEARCH_MEDIA_IN_MEDIA_FAILURE;
}

export interface IGetMediaListAction {
  options: IMediaListOptionsModel;
  type: typeof Consts.GET_MEDIA_LIST;
}

export interface IGetMediaListSuccessAction {
  mediaListId: number;
  payload: IMediaListModel;
  type: typeof Consts.GET_MEDIA_LIST_SUCCESS;
}

export interface IGetMediaListFailureAction {
  mediaListId: number;
  error?: IErrorModel;
  type: typeof Consts.GET_MEDIA_LIST_FAILURE;
}

export interface IGetMediaListFromCacheAction {
  options: IMediaListOptionsModel;
  type: typeof Consts.GET_MEDIA_LIST_FROM_CACHE;
}

export interface IGetMediaListFromCacheSuccessAction {
  mediaListId: number;
  payload: IMediaListModel;
  type: typeof Consts.GET_MEDIA_LIST_FROM_CACHE_SUCCESS;
}

export interface IGetMediaListFromCacheFailureAction {
  mediaListId: number;
  error?: IErrorModel;
  type: typeof Consts.GET_MEDIA_LIST_FROM_CACHE_FAILURE;
}

export interface IGetMediaListForEpgAction {
  options: IMediaListOptionsModel;
  type: typeof Consts.GET_MEDIA_LIST_FOR_EPG;
}

export interface IGetMediaListForEpgSuccessAction {
  mediaListId: number;
  options: IMediaListOptionsModel;
  payload: IMediaListModel;
  type: typeof Consts.GET_MEDIA_LIST_FOR_EPG_SUCCESS;
}

export interface IGetMediaListForEpgFailureAction {
  mediaListId: number;
  options: IMediaListOptionsModel;
  error?: IErrorModel;
  type: typeof Consts.GET_MEDIA_LIST_FOR_EPG_FAILURE;
}

export interface IGetMediaCategoriesAction {
  type: typeof Consts.GET_MEDIA_CATEGORIES;
}

export interface IGetMediaCategoriesSuccessAction {
  type: typeof Consts.GET_MEDIA_CATEGORIES_SUCCESS;
  payload: IMediaCategoryListModel;
}

export interface IGetMediaCategoriesFailureAction {
  type: typeof Consts.GET_MEDIA_CATEGORIES_FAILURE;
  error?: IErrorModel;
}

export interface ISelectMediaPurchaseOffersAction {
  mediaId: number;
  type: typeof Consts.SELECT_MEDIA_PURCHASE_OFFERS;
}

export interface ISelectMediaPurchaseOffersSuccessAction {
  mediaId: number;
  type: typeof Consts.SELECT_MEDIA_PURCHASE_OFFERS_SUCCESS;
  payload: IMediaPurchaseOfferModel[];
}

export interface ISelectMediaPurchaseOffersFailureAction {
  mediaId: number;
  type: typeof Consts.SELECT_MEDIA_PURCHASE_OFFERS_FAILURE;
  error?: IErrorModel;
}

export interface IClearMediaAction {
  type: typeof Consts.CLEAR_MEDIA;
}

export interface IRemoveFromFavouritesListAction {
  type: typeof Consts.REMOVE_FROM_FAVORITES_LIST;
  mediaId: string | number;
}

export interface IAddToFavouritesListAction {
  type: typeof Consts.ADD_TO_FAVORITES_LIST;
  media: IMediaModel;
}

export interface IGetMediaChannelsForUserAction {
  type: typeof Consts.GET_MEDIA_CHANNELS_FOR_USER;
}

export interface IGetMediaChannelsForUserSuccessAction {
  type: typeof Consts.GET_MEDIA_CHANNELS_FOR_USER_SUCCESS;
  payload: Partial<IMediaChannelsForUserModel>[];
}

export interface IGetMediaChannelsForUserFailureAction {
  type: typeof Consts.GET_MEDIA_CHANNELS_FOR_USER_FAILURE;
  error?: IErrorModel;
}

export interface IGetMediaChannelProgramsAction {
  type: typeof Consts.GET_MEDIA_CHANNEL_PROGRAMS;
  options: IMediaChannelProgramOptionsModel;
}

export interface IGetMediaChannelProgramsSuccessAction {
  type: typeof Consts.GET_MEDIA_CHANNEL_PROGRAMS_SUCCESS;
  payload: IMediaListModel;
  channelIds: number[];
}

export interface IGetMediaChannelProgramsFailureAction {
  type: typeof Consts.GET_MEDIA_CHANNEL_PROGRAMS_FAILURE;
  error?: IErrorModel;
  channelIds: number[];
}

export type MediaActionsTypes =
  | IGetMediaAction
  | IGetMediaSuccessAction
  | IGetMediaFailureAction
  | IGetMediaPlayInfoAction
  | IGetMediaPlayInfoFailureAction
  | IGetMediaPlayInfoSuccessAction
  | IGetMediaListAction
  | IGetMediaListSuccessAction
  | IGetMediaListFailureAction
  | IGetMediaListFromCacheAction
  | IGetMediaListFromCacheSuccessAction
  | IGetMediaListFromCacheFailureAction
  | IGetMediaCategoriesAction
  | IGetMediaCategoriesSuccessAction
  | IGetMediaCategoriesFailureAction
  | ISearchMediaAction
  | ISearchMediaSuccessAction
  | ISearchMediaFailureAction
  | IGetMediaListForEpgAction
  | IGetMediaListForEpgFailureAction
  | IGetMediaListForEpgSuccessAction
  | ISelectMediaPurchaseOffersAction
  | ISelectMediaPurchaseOffersSuccessAction
  | ISelectMediaPurchaseOffersFailureAction
  | ISearchMediaInMediaSuccessAction
  | ISearchMediaInMediaFailureAction
  | IClearMediaAction
  | IAddToFavouritesListAction
  | IRemoveFromFavouritesListAction
  | IGetMediaChannelsForUserAction
  | IGetMediaChannelsForUserSuccessAction
  | IGetMediaChannelsForUserFailureAction
  | IGetMediaChannelProgramsAction
  | IGetMediaChannelProgramsSuccessAction
  | IGetMediaChannelProgramsFailureAction;
