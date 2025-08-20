/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { SourceType } from "../../enums";
import { getMediaFavouriteListId } from "../../helpers/mediaListHelper";
import { IMediaModel, IMediaSearchCategories } from "../../models";

import * as Consts from "./consts";
import { IMediaState, MediaActionsTypes } from "./types";
import { getDayKeyForEpgOptions } from "./utils";

export const initialState: IMediaState = {
  action: undefined,
  media: {},
  mediaPlayInfo: {},
  mediaList: {},
  epg: {},
  channelList: {
    SourceType: SourceType.MediaList,
    Entities: [],
    TotalCount: 0,
    IsLoading: false,
  },
  channelPrograms: {},
  mediaCategories: {
    Entities: [],
    TotalCount: 0,
  },
  mediaSearch: {
    Entities: [],
    TotalCount: 0,
  },
  mediaPurchaseOffers: {},
};

export const mediaReducer = (
  state = initialState,
  action: MediaActionsTypes
): IMediaState => {
  state.action = action;

  switch (action.type) {
    case Consts.GET_MEDIA: {
      return {
        ...state,
        media: {
          ...state.media,
          [action.options.MediaId]: {
            Media: {
              ...state.media[action.options.MediaId]?.Media,
              Id: action.options.MediaId,
            },
            IsLoading: true,
          },
        },
      };
    }
    case Consts.GET_MEDIA_SUCCESS: {
      return {
        ...state,
        media: {
          ...state.media,
          [action.payload.Id]: {
            ...state.media[action.payload.Id],
            Media: action.payload,
            Error: undefined,
            IsLoading: false,
          },
        },
      };
    }
    case Consts.SEARCH_MEDIA_IN_MEDIA_SUCCESS: {
      if (!action.filter.MediaParentId) return state;

      const pageNumber = action.payload?.Filter?.PageNumber;
      let entities: IMediaModel[] = [];

      if (pageNumber === 1) {
        entities = action.payload.Entities;
      } else if (pageNumber && pageNumber > 1) {
        entities = [
          ...state.mediaList[action.filter.MediaParentId]?.Entities,
          ...action.payload.Entities,
        ];
      }

      return {
        ...state,
        mediaList: {
          ...state.mediaList,
          [action.filter.MediaParentId]: {
            IsLoading: false,
            TotalCount: action.payload.TotalCount,
            Filter: action.filter,
            Entities: entities,
          },
        },
      };
    }
    case Consts.GET_MEDIA_FAILURE: {
      return {
        ...state,
        media: {
          ...state.media,
          [action.mediaId]: {
            ...state.media[action.mediaId],
            Media: undefined,
            Error: action.error,
            IsLoading: false,
          },
        },
      };
    }
    case Consts.GET_MEDIA_PLAY_INFO: {
      return {
        ...state,
        mediaPlayInfo: {
          ...state.mediaPlayInfo,
          [action.options.MediaId]: {
            Data: undefined,
            IsProcessing: true,
          },
        },
      };
    }
    case Consts.GET_MEDIA_PLAY_INFO_SUCCESS: {
      return {
        ...state,
        mediaPlayInfo: {
          ...state.mediaPlayInfo,
          [action.options.MediaId]: {
            ...state.mediaPlayInfo[action.options.MediaId],
            Data: {
              ...state.mediaPlayInfo[action.options.MediaId].Data,
              ...action.payload,
            },
            Error: undefined,
            IsProcessing: false,
          },
        },
      };
    }
    case Consts.GET_MEDIA_PLAY_INFO_FAILURE: {
      return {
        ...state,
        mediaPlayInfo: {
          ...state.mediaPlayInfo,
          [action.options.MediaId]: {
            ...state.mediaPlayInfo[action.options.MediaId],
            Data: undefined,
            Error: action.error,
            IsProcessing: false,
          },
        },
      };
    }
    case Consts.SEARCH_MEDIA: {
      let mediaList = state.mediaList[Consts.MEDIA_LIST_SEARCH_KEY];

      if (!mediaList) {
        mediaList = {
          Entities: [],
          TotalCount: 0,
          SourceType: SourceType.MediaList,
        };
      }

      return {
        ...state,
        mediaList: {
          ...state.mediaList,
          [Consts.MEDIA_LIST_SEARCH_KEY]: {
            ...mediaList,
            Filter: action.filter,
            IsLoading: true,
          },
        },
        mediaSearch: {
          ...state.mediaSearch,
          Filter: action.filter,
          Error: undefined,
          IsLoading: true,
        },
      };
    }
    case Consts.SEARCH_MEDIA_SUCCESS: {
      const pageNumber = action.payload?.Filter?.PageNumber;
      let entities: IMediaModel[] = [];

      if (pageNumber === 1) {
        entities = action.payload.Entities;
      } else if (pageNumber && pageNumber > 1) {
        // entities = [
        //     ...(state.mediaList[Consts.MEDIA_LIST_SEARCH_KEY]?.Entities || []),
        //     ...action.payload.Entities,
        // ];
        entities = [...state.mediaSearch.Entities, ...action.payload.Entities];
      }

      let allMediaCategories: IMediaSearchCategories[] =
        state.mediaList[Consts.MEDIA_LIST_SEARCH_KEY]?.AllPagesCategories || [];

      let allCategories: IMediaSearchCategories[] =
        state.mediaSearch?.AllPagesCategories ||
        action.payload.AllPagesCategories ||
        [];

      if (
        !action.payload?.Filter?.FullTextSearch &&
        state.mediaSearch.AllPagesCategories &&
        action.payload.AllPagesCategories
      ) {
        if (
          state.mediaSearch.AllPagesCategories.length >
          action.payload.AllPagesCategories.length
        ) {
          allMediaCategories = state.mediaSearch.AllPagesCategories;
        } else {
          allCategories = action.payload.AllPagesCategories;
          allMediaCategories = action.payload.AllPagesCategories;
        }
      } else if (action.payload?.AllPagesCategories) {
        allMediaCategories = action.payload.AllPagesCategories;
      }

      return {
        ...state,
        mediaList: {
          ...state.mediaList,
          [Consts.MEDIA_LIST_SEARCH_KEY]: {
            ...state.media[Consts.MEDIA_LIST_SEARCH_KEY],
            SourceType: SourceType.MediaList,
            Filter: action.payload.Filter,
            TotalCount: action.payload.TotalCount,
            AllPagesCategories: allMediaCategories,
            Entities: entities,
            Error: undefined,
            IsLoading: false,
          },
        },
        mediaSearch: {
          ...state.mediaSearch,
          ...action.payload,
          AllPagesCategories: allCategories,
          Suggestions:
            action.payload.Suggestions ?? state.mediaSearch.Suggestions,
          Entities: entities,
          Error: undefined,
          IsLoading: false,
        },
      };
    }
    case Consts.SEARCH_MEDIA_FAILURE: {
      return {
        ...state,
        mediaList: {
          ...state.mediaList,
          [Consts.MEDIA_LIST_SEARCH_KEY]: {
            ...state.media[Consts.MEDIA_LIST_SEARCH_KEY],
            SourceType: SourceType.MediaList,
            Entities: [],
            TotalCount: 0,
            Error: action.error,
            IsLoading: false,
          },
        },
        mediaSearch: {
          ...state.mediaSearch,
          Entities: [],
          TotalCount: 0,
          Error: action.error,
          IsLoading: false,
        },
      };
    }
    case Consts.GET_MEDIA_LIST:
    case Consts.GET_MEDIA_LIST_FROM_CACHE: {
      let mediaList = state.mediaList[action.options.MediaListId];

      if (!mediaList) {
        mediaList = {
          Entities: [],
          TotalCount: 0,
          SourceType: SourceType.MediaList,
        };
      }

      return {
        ...state,
        mediaList: {
          ...state.mediaList,
          [action.options.MediaListId]: {
            ...mediaList,
            Filter: action.options,
            IsLoading: true,
          },
        },
      };
    }
    case Consts.GET_MEDIA_LIST_SUCCESS:
    case Consts.GET_MEDIA_LIST_FROM_CACHE_SUCCESS: {
      const pageNumber = action.payload?.Filter?.PageNumber;
      let entities: IMediaModel[] = [];
      let allMediaCategories: IMediaSearchCategories[] = [];

      if (pageNumber === 1) {
        entities = action.payload.Entities;
      } else if (pageNumber && pageNumber > 1) {
        entities = [
          ...(state.mediaList[action.mediaListId]?.Entities || []),
          ...action.payload.Entities,
        ];
      }
      if (
        !state.mediaList[action.mediaListId]?.AllPagesCategories &&
        action.payload.AllPagesCategories
      ) {
        allMediaCategories = [...action.payload.AllPagesCategories];
      }

      if (
        action.payload?.Filter?.Categories &&
        action.payload.Filter.Categories.length > 0 &&
        state.mediaList[action.mediaListId]?.Entities
      ) {
        allMediaCategories =
          state.mediaList[action.mediaListId]?.AllPagesCategories || [];
      } else {
        allMediaCategories = action.payload.AllPagesCategories || [];
      }

      return {
        ...state,
        mediaList: {
          ...state.mediaList,
          [action.mediaListId]: {
            ...state.media[action.mediaListId],
            ...action.payload,
            AllPagesCategories: allMediaCategories,
            Entities: entities,
            Error: undefined,
            IsLoading: false,
          },
        },
      };
    }
    case Consts.GET_MEDIA_LIST_FAILURE:
    case Consts.GET_MEDIA_LIST_FROM_CACHE_FAILURE: {
      return {
        ...state,
        mediaList: {
          ...state.mediaList,
          [action.mediaListId]: {
            ...state.media[action.mediaListId],
            Entities: [],
            TotalCount: 0,
            Error: action.error,
            IsLoading: false,
          },
        },
      };
    }
    case Consts.GET_MEDIA_CATEGORIES: {
      return {
        ...state,
        mediaCategories: {
          ...state.mediaCategories,
          IsLoading: true,
          Error: undefined,
        },
      };
    }
    case Consts.GET_MEDIA_CATEGORIES_SUCCESS: {
      return {
        ...state,
        mediaCategories: {
          ...action.payload,
          IsLoading: false,
        },
      };
    }
    case Consts.GET_MEDIA_CATEGORIES_FAILURE: {
      return {
        ...state,
        mediaCategories: {
          ...state.mediaCategories,
          IsLoading: false,
          Error: action.error,
        },
      };
    }
    case Consts.GET_MEDIA_LIST_FOR_EPG: {
      const dateKey = getDayKeyForEpgOptions(action.options);
      let dateEpg = state.epg[dateKey];

      if (!dateEpg) {
        dateEpg = {
          Entities: [],
          TotalCount: 0,
          SourceType: SourceType.MediaList,
          Error: undefined,
          Filter: action.options,
        };
      }

      return {
        ...state,
        epg: {
          ...state.epg,
          [dateKey]: {
            ...dateEpg,
            IsLoading: true,
          },
        },
      };
    }
    case Consts.GET_MEDIA_LIST_FOR_EPG_SUCCESS: {
      const dateKey = getDayKeyForEpgOptions(action.options);
      const pageNumber = action.payload?.Filter?.PageNumber;

      let entities: IMediaModel[] = [];

      if (pageNumber === 1) {
        entities = action.payload.Entities;
      }

      if (pageNumber && pageNumber > 1) {
        entities = [
          ...(state.mediaList[action.mediaListId]?.Entities || []),
          ...action.payload.Entities,
        ];
      }

      return {
        ...state,
        epg: {
          ...state.epg,
          [dateKey]: {
            ...state.epg[dateKey],
            ...action.payload,
            Entities: entities,
            Error: undefined,
            IsLoading: false,
          },
        },
      };
    }
    case Consts.GET_MEDIA_LIST_FOR_EPG_FAILURE: {
      const dateKey = getDayKeyForEpgOptions(action.options);

      return {
        ...state,
        epg: {
          ...state.epg,
          [dateKey]: {
            ...state.epg[dateKey],
            Entities: [],
            TotalCount: 0,
            Error: action.error,
            IsLoading: false,
          },
        },
      };
    }
    case Consts.SELECT_MEDIA_PURCHASE_OFFERS: {
      return {
        ...state,
        mediaPurchaseOffers: {
          ...state.mediaPurchaseOffers,
          [action.mediaId]: {
            ...(state.mediaPurchaseOffers[action.mediaId] || []),
            IsProcessing: true,
            Error: undefined,
          },
        },
      };
    }
    case Consts.SELECT_MEDIA_PURCHASE_OFFERS_SUCCESS: {
      return {
        ...state,
        mediaPurchaseOffers: {
          ...state.mediaPurchaseOffers,
          [action.mediaId]: {
            ...(state.mediaPurchaseOffers[action.mediaId] || []),
            Data: action.payload,
            IsProcessing: false,
            Error: undefined,
          },
        },
      };
    }
    case Consts.SELECT_MEDIA_PURCHASE_OFFERS_FAILURE: {
      return {
        ...state,
        mediaPurchaseOffers: {
          ...state.mediaPurchaseOffers,
          [action.mediaId]: {
            ...(state.mediaPurchaseOffers[action.mediaId] || []),
            IsProcessing: false,
            Error: action.error,
          },
        },
      };
    }
    case Consts.REMOVE_FROM_FAVORITES_LIST: {
      const mediaListId = getMediaFavouriteListId(state.mediaList);

      if (mediaListId) {
        const entitiesList = state.mediaList[mediaListId];
        entitiesList.Entities = entitiesList.Entities.filter(
          (asset) => asset.Id !== action.mediaId
        );

        return {
          ...state,
          mediaList: {
            ...state.mediaList,
            [mediaListId]: {
              ...entitiesList,
              TotalCount: entitiesList.Entities.length,
            },
          },
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case Consts.ADD_TO_FAVORITES_LIST: {
      const mediaListId = getMediaFavouriteListId(state.mediaList);

      if (mediaListId) {
        const entitiesList = state.mediaList[mediaListId];
        entitiesList.Entities.unshift(action.media);

        return {
          ...state,
          mediaList: {
            ...state.mediaList,
            [mediaListId]: {
              ...entitiesList,
              TotalCount: entitiesList.Entities.length,
            },
          },
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case Consts.GET_MEDIA_CHANNELS_FOR_USER: {
      return {
        ...state,
        channelList: {
          ...state.channelList,
          IsLoading: true,
        },
      };
    }
    case Consts.GET_MEDIA_CHANNELS_FOR_USER_SUCCESS: {
      return {
        ...state,
        channelList: {
          ...state.channelList,
          Entities: action.payload as IMediaModel[],
          TotalCount: action.payload.length,
          IsLoading: false,
        },
      };
    }
    case Consts.GET_MEDIA_CHANNELS_FOR_USER_FAILURE: {
      return {
        ...state,
        channelList: {
          ...state.channelList,
          Entities: [],
          IsLoading: false,
          Error: action.error,
        },
      };
    }
    case Consts.GET_MEDIA_CHANNEL_PROGRAMS: {
      const newChannelKeys = action.options.MediaOptions?.MediaIds;

      const channelsData = Object.assign({}, state.channelPrograms);

      newChannelKeys?.forEach((key) => {
        if (!(key in channelsData)) {
          channelsData[key] = {
            Id: key,
            Media: [],
            IsLoading: true,
          };
        } else {
          channelsData[key] = {
            ...channelsData[key],
            IsLoading: true,
          };
        }
      });

      return {
        ...state,
        channelPrograms: {
          ...channelsData,
        },
      };
    }
    case Consts.GET_MEDIA_CHANNEL_PROGRAMS_SUCCESS: {
      const temporaryObj = {};

      const pageNumber = action.payload?.PageNumber;

      const hasProgramsData = action.payload?.Entities.length > 0;

      if (pageNumber === 1 && !hasProgramsData) {
        action.channelIds.forEach((channelID) => {
          return Object.assign(temporaryObj, {
            [channelID]: {
              ...action.payload,
              IsLoading: false,
              PageSize: action.payload.PageSize,
              TotalCount: action.payload.TotalCount,
              PageNumber: action.payload.PageNumber,
            },
          });
        });
      } else if (pageNumber === 1 && hasProgramsData) {
        action.payload.Entities.forEach((channel) => {
          return Object.assign(temporaryObj, {
            [channel.Id]: {
              ...channel,
              IsLoading: false,
              PageSize: action.payload.PageSize,
              TotalCount: action.payload.TotalCount,
              PageNumber: action.payload.PageNumber,
            },
          });
        });
      } else if (pageNumber && pageNumber > 1) {
        action.payload.Entities.forEach((channel) => {
          return Object.assign(temporaryObj, {
            [channel.Id]: {
              ...channel,
              Media: [
                ...state.channelPrograms[channel.Id].Media!,
                ...channel.Media!,
              ],
              IsLoading: false,
              PageSize: action.payload.PageSize,
              TotalCount: action.payload.TotalCount,
              PageNumber: action.payload.PageNumber,
            },
          });
        });
      }

      return {
        ...state,
        channelPrograms: {
          ...state.channelPrograms,
          ...temporaryObj,
        },
      };
    }
    case Consts.GET_MEDIA_CHANNEL_PROGRAMS_FAILURE: {
      const temporaryObj = {};

      action.channelIds.forEach((channelId) => {
        return Object.assign(temporaryObj, {
          [channelId]: {
            Media: [],
            TotalCount: 0,
            Error: action.error,
            IsLoading: false,
          },
        });
      });

      return {
        ...state,
        channelPrograms: {
          ...state.channelPrograms,
          ...temporaryObj,
        },
      };
    }
    default:
      return state;
  }
};
