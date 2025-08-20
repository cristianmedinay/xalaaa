/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ActionsObservable, ofType, StateObservable } from "redux-observable";
import { debounceTime, mergeMap, switchMap } from "rxjs/operators";

import { IAppState } from "store/types";

import { MediaListType, MediaType } from "../../enums";
import { TimeHelper, yieldToMain } from "../../helpers";
import {
  ChannelsStorage,
  IErrorModel,
  IMediaCategoryListModel,
  IMediaListModel,
  IMediaModel,
  IMediaPlayInfoModel,
  IMediaSearchStateModel,
  SourceStorage,
} from "../../models";
import { DataProvider } from "../../providers/DataProvider";
import { StorageManager } from "../../services";

import * as Actions from "./actions";
import * as Consts from "./consts";
import {
  IGetMediaAction,
  IGetMediaCategoriesAction,
  IGetMediaChannelProgramsAction,
  IGetMediaChannelsForUserAction,
  IGetMediaListAction,
  IGetMediaListForEpgAction,
  IGetMediaListFromCacheAction,
  IGetMediaPlayInfoAction,
  ISearchMediaAction,
  ISearchMediaInMediaAction,
  ISelectMediaPurchaseOffersAction,
} from "./types";
import { getDayKeyForEpgOptions } from "./utils";

const getMediaEpic = (action$: ActionsObservable<IGetMediaAction>) =>
  action$.pipe(
    ofType(Consts.GET_MEDIA),
    switchMap((action: IGetMediaAction) =>
      DataProvider.getMedia(action.options)
        .then((data: IMediaModel) => {
          if (!data) {
            return Actions.getMediaFailure(action.options.MediaId, {
              ResultType: 204,
            });
          }

          return Actions.getMediaSuccess(data);
        })
        .catch((error) => {
          return Actions.getMediaFailure(action.options.MediaId, error);
        })
    )
  );

const getMediaPlayInfoEpic = (
  action$: ActionsObservable<IGetMediaPlayInfoAction>
) =>
  action$.pipe(
    ofType(Consts.GET_MEDIA_PLAY_INFO),
    switchMap((action: IGetMediaPlayInfoAction) =>
      DataProvider.getMediaPlayInfo(action.options)
        .then((data: IMediaPlayInfoModel) => {
          return Actions.getMediaPlayInfoSuccess(action.options, data);
        })
        .catch((error) => {
          return Actions.getMediaPlayInfoFailure(action.options, error);
        })
    )
  );

const searchMediaEpic = (action$: ActionsObservable<ISearchMediaAction>) =>
  action$.pipe(
    ofType(Consts.SEARCH_MEDIA),
    switchMap((action: ISearchMediaAction) => {
      const searchByTypes = action.filter.Types || [
        MediaType.Video,
        MediaType.Series,
        MediaType.Package,
        MediaType.Live,
        MediaType.VideoPremiere,
        MediaType.Channel,
        MediaType.Podcast,
        MediaType.Album,
        MediaType.Event,
        MediaType.Episode,
      ];

      const extendedFilters = {
        ...action.filter,
        Types: searchByTypes,
      };

      return DataProvider.searchMedia(extendedFilters)
        .then((data: IMediaSearchStateModel) => {
          data.Filter = extendedFilters;

          return Actions.searchMediaSuccess(data);
        })
        .catch((error) => {
          return Actions.searchMediaFailure(error);
        });
    })
  );

const searchMediaInMediaEpic = (
  action$: ActionsObservable<ISearchMediaInMediaAction>
) =>
  action$.pipe(
    ofType(Consts.SEARCH_MEDIA_IN_MEDIA),
    switchMap((action: ISearchMediaInMediaAction) =>
      DataProvider.searchMediaInMedia(action.filter)
        .then((data: IMediaListModel) => {
          data.Filter = action.filter;

          return Actions.searchMediaInMediaSuccess(action.filter, data);
        })
        .catch((error: IErrorModel) => {
          return Actions.searchMediaInMediaFailure(action.filter, error);
        })
    )
  );

const getMediaListEpic = (action$: ActionsObservable<IGetMediaListAction>) =>
  action$.pipe(
    ofType(Consts.GET_MEDIA_LIST),
    switchMap((action: IGetMediaListAction) =>
      DataProvider.getMediaList(action.options)
        .then((data: IMediaListModel) => {
          data.Filter = action.options;

          return Actions.getMediaListSuccess(action.options.MediaListId, data);
        })
        .catch((error) => {
          return Actions.getMediaListFailure(action.options.MediaListId, error);
        })
    )
  );

export const getMediaListForEpgEpic = (
  action$: ActionsObservable<IGetMediaListForEpgAction>,
  state$: StateObservable<IAppState>
) =>
  action$.pipe(
    ofType(Consts.GET_MEDIA_LIST_FOR_EPG),
    mergeMap(async (action: IGetMediaListForEpgAction) => {
      const { options } = action;

      const dateKey = getDayKeyForEpgOptions(action.options);
      const currentDayEpg = state$.value.media.epg[dateKey];

      const shouldFetchData = Boolean(
        !currentDayEpg.Entities.length ||
          (currentDayEpg.CacheDataValidTo &&
            TimeHelper.isAfter(
              TimeHelper.parse(currentDayEpg.CacheDataValidTo!)
            ))
      );

      if (shouldFetchData) {
        return DataProvider.getMediaList(options)
          .then((data: IMediaListModel) => {
            data.Filter = options;

            return Actions.getMediaListForEpgSuccess(
              options.MediaListId,
              options,
              data
            );
          })
          .catch((error: IErrorModel) =>
            Actions.getMediaListForEpgFailure(
              options.MediaListId,
              options,
              error
            )
          );
      }

      // simulate small delay that will allow slow devices to refresh UI
      // before new data from store will be available
      await new Promise((resolve) => setTimeout(resolve, 500));

      return Actions.getMediaListForEpgSuccess(
        options.MediaListId,
        options,
        currentDayEpg
      );
    })
  );

const getMediaCategoriesEpic = (
  action$: ActionsObservable<IGetMediaCategoriesAction>
) =>
  action$.pipe(
    ofType(Consts.GET_MEDIA_CATEGORIES),
    switchMap((_action: IGetMediaCategoriesAction) =>
      DataProvider.getMediaCategories()
        .then((data: IMediaCategoryListModel) => {
          return Actions.getMediaCategoriesSuccess(data);
        })
        .catch((error) => {
          return Actions.getMediaCategoriesFailure(error);
        })
    )
  );

const getMediaListFromCacheEpic = (
  action$: ActionsObservable<IGetMediaListFromCacheAction>
) =>
  action$.pipe(
    ofType(Consts.GET_MEDIA_LIST_FROM_CACHE),
    mergeMap(async (action: IGetMediaListFromCacheAction) => {
      const { MediaListId, Type } = action.options;

      try {
        const sourcesFromCache: SourceStorage = await StorageManager.getValue(
          "source"
        );

        const shouldGetSource =
          !sourcesFromCache ||
          !sourcesFromCache[MediaListId] ||
          (sourcesFromCache[MediaListId].CacheDataValidTo &&
            TimeHelper.isAfter(
              TimeHelper.parse(sourcesFromCache[MediaListId].CacheDataValidTo!)
            ));

        if (shouldGetSource || Type === MediaListType.MyList) {
          const newSource = await DataProvider.getMediaList(action.options);

          await yieldToMain();

          const previousSources = await StorageManager.getValue("source");
          newSource.Filter = action.options;

          await StorageManager.setValue("source", {
            ...previousSources,
            [MediaListId]: newSource,
          });

          return Actions.getMediaListFromCacheSuccess(MediaListId, newSource);
        }

        sourcesFromCache[MediaListId].Filter = action.options;
        return Actions.getMediaListFromCacheSuccess(
          MediaListId,
          sourcesFromCache[MediaListId]
        );
      } catch (error) {
        return Actions.getMediaListFromCacheFailure(MediaListId, error as any);
      }
    })
  );

export const selectMediaPurchaseOffersEpic = (
  action$: ActionsObservable<ISelectMediaPurchaseOffersAction>
) =>
  action$.pipe(
    ofType(Consts.SELECT_MEDIA_PURCHASE_OFFERS),
    switchMap((action: ISelectMediaPurchaseOffersAction) =>
      DataProvider.selectMediaPurchaseOffers(action.mediaId)
        .then((data) =>
          Actions.selectMediaPurchaseOffersSuccess(action.mediaId, data)
        )
        .catch((error) =>
          Actions.selectMediaPurchaseOffersFailure(action.mediaId, error)
        )
    )
  );

export const getMediaChannelsForUserEpic = (
  action$: ActionsObservable<IGetMediaChannelsForUserAction>
) =>
  action$.pipe(
    ofType(Consts.GET_MEDIA_CHANNELS_FOR_USER),
    debounceTime(250),
    mergeMap(async () => {
      try {
        const { lastUpdateDate, channels }: ChannelsStorage =
          (await StorageManager.getValue("channels")) || {};

        let shouldUpdateCache = false;

        if (!channels || !channels.length) {
          shouldUpdateCache = true;
        }

        if (lastUpdateDate) {
          const cachedTime = TimeHelper.getDateWithOffset(
            lastUpdateDate,
            5,
            "minutes"
          );
          shouldUpdateCache = TimeHelper.isAfter(cachedTime);
        }

        if (shouldUpdateCache) {
          const updatedChannels = await DataProvider.getMediaChannelsForUser(
            true
          ).then((channels) =>
            // Return only channels that have SimilarMedia, since it will return current playing program
            channels.filter((channels) => Boolean(channels.SimilarMedia))
          );

          await StorageManager.setValue("channels", {
            lastUpdateDate: TimeHelper.getCurrentDateTime(),
            channels: updatedChannels,
          });
          return Actions.getMediaChannelsForUserSuccess(updatedChannels);
        }

        return Actions.getMediaChannelsForUserSuccess(channels);
      } catch (error) {
        return Actions.getMediaChannelsForUserFailure(error as any);
      }
    })
  );

const getMediaChannelProgramsEpic = (
  action$: ActionsObservable<IGetMediaChannelProgramsAction>
) =>
  action$.pipe(
    ofType(Consts.GET_MEDIA_CHANNEL_PROGRAMS),
    switchMap((action: IGetMediaChannelProgramsAction) =>
      DataProvider.getMediaChannelPrograms(action.options)
        .then((data: IMediaListModel) => {
          const channelIds = action.options.MediaOptions?.MediaIds as number[];
          return Actions.getMediaChannelProgramsSuccess(channelIds, data);
        })
        .catch((error) => {
          const channelIds = action.options.MediaOptions?.MediaIds as number[];
          return Actions.getMediaChannelProgramsFailure(channelIds, error);
        })
    )
  );

export const mediaEpics = [
  getMediaEpic,
  getMediaPlayInfoEpic,
  searchMediaEpic,
  searchMediaInMediaEpic,
  getMediaListEpic,
  getMediaCategoriesEpic,
  getMediaListFromCacheEpic,
  getMediaListForEpgEpic,
  selectMediaPurchaseOffersEpic,
  getMediaChannelsForUserEpic,
  getMediaChannelProgramsEpic,
];
