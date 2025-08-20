/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IDownloadSource, IMediaModel } from "models";

import { DownloadMediaStatus } from "../../enums";
import { StorageManager } from "../../services";
import { createReducers } from "../utils";

import { ActionTypes } from "./consts";
import { IOfflineMode } from "./IOfflineMode";
import { OfflineModeActionTypes } from "./types";

export const initialState: IOfflineMode = {
  isOnline: false,
  media: [],
  loadingPodcasts: false,
};

export const offlineModeReducers = createReducers(initialState, {
  [ActionTypes.SET_OFFLINE_MODE]: (state) => ({
    ...state,
    isOnline: false,
  }),
  [ActionTypes.SET_ONLINE_MODE]: (state) => ({
    ...state,
    isOnline: true,
  }),
  [ActionTypes.GET_DOWNLOADED_PODCASTS]: (state) => ({
    ...state,
    loadingPodcasts: true,
  }),
  [ActionTypes.GET_DOWNLOADED_PODCASTS_SUCCESS]: (
    state,
    action: OfflineModeActionTypes
  ) => ({
    ...state,
    loadingPodcasts: false,
    media: (action.payload as IDownloadSource[]) ?? [],
  }),
  [ActionTypes.GET_DOWNLOADED_PODCASTS_FAILURE]: (state) => ({
    ...state,
    loadingPodcasts: false,
    media: [],
  }),
  [ActionTypes.ADD_TO_QUEUE]: (state, action: OfflineModeActionTypes) => {
    const media = action.payload as IMediaModel;

    const isAlreadyQueued = state.media.find((m) => m.media.Id === media.Id);
    if (isAlreadyQueued)
      return {
        ...state,
      };

    state.media.push({
      media: media,
      localFile: {
        downloadProgress: 0,
        ContentUrl: "",
        downloadStatus: DownloadMediaStatus.QUEUED,
      },
    });
    StorageManager.setValue("podcasts", state.media);
    return {
      ...state,
    };
  },
  [ActionTypes.ADD_JOB_ID]: (state, action: OfflineModeActionTypes) => {
    const { media, jobId } = action.payload as IDownloadSource;

    const mediaTmp = state.media.map((downloadSource) =>
      downloadSource.media.Id === media.Id
        ? {
            ...downloadSource,
            jobId,
          }
        : downloadSource
    );
    StorageManager.setValue("podcasts", mediaTmp);

    return {
      ...state,
      media: mediaTmp,
    };
  },
  [ActionTypes.START_DOWNLOAD]: (state, action: OfflineModeActionTypes) => {
    const podcastSource = action.payload as IDownloadSource;
    state.media.push({
      media: action.payload as IMediaModel,
      localFile: {
        downloadProgress: 0,
        ContentUrl: podcastSource.localFile?.ContentUrl || "",
        downloadStatus: DownloadMediaStatus.IN_PROGRESS,
      },
    });
    StorageManager.setValue("podcasts", state.media);
    return {
      ...state,
    };
  },
  [ActionTypes.START_DOWNLOAD_SUCCESS]: (
    state,
    action: OfflineModeActionTypes
  ) => {
    const podcastSource = action.payload as IDownloadSource;
    const updatedPodcasts = state.media.map((p) =>
      p.media.Id === podcastSource.media.Id
        ? {
            media: podcastSource.media,
            localFile: {
              ContentUrl: podcastSource?.localFile?.ContentUrl ?? "",
              downloadStatus: DownloadMediaStatus.DOWNLOADED,
              downloadProgress: 100,
            },
          }
        : p
    );
    StorageManager.setValue("podcasts", updatedPodcasts);
    return {
      ...state,
      media: updatedPodcasts,
    };
  },
  [ActionTypes.START_DOWNLOAD_FAILED]: (
    state,
    action: OfflineModeActionTypes
  ) => {
    const podcastSource = action.payload as IDownloadSource;
    const updatedPodcasts = state.media.map((p) =>
      p.media.Id === podcastSource.media.Id
        ? {
            media: podcastSource.media,
            localFile: {
              ContentUrl: "",
              downloadStatus: DownloadMediaStatus.FAILED,
              downloadProgress: 0,
            },
          }
        : p
    );
    return {
      ...state,
      podcasts: updatedPodcasts,
    };
  },
  [ActionTypes.SET_DOWNLOAD_PROGRESS]: (
    state,
    action: OfflineModeActionTypes
  ) => {
    const podcastSource = action.payload as IDownloadSource;
    const updatedPodcasts = state.media.map((p) =>
      p.media.Id === podcastSource.media.Id
        ? {
            media: podcastSource.media,
            localFile: {
              ContentUrl: podcastSource.localFile?.ContentUrl ?? "",
              downloadStatus: DownloadMediaStatus.IN_PROGRESS,
              downloadProgress: podcastSource.localFile?.downloadProgress,
            },
          }
        : p
    );
    StorageManager.setValue("podcasts", updatedPodcasts);
    return {
      ...state,
      media: updatedPodcasts,
    };
  },
  [ActionTypes.UPDATE_DOWNLOADED_MEDIA]: (
    state,
    action: OfflineModeActionTypes
  ) => {
    const downloadedMedia = action.payload as IDownloadSource[];
    return {
      ...state,
      media: downloadedMedia,
    };
  },
});
