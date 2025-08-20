/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { IDownloadSource, IMediaModel } from "models";

import { createPayloadAction } from "../utils";

import { ActionTypes } from "./consts";

const setOfflineMode = createPayloadAction<void>(ActionTypes.SET_OFFLINE_MODE);

const setOnlineMode = createPayloadAction<void>(ActionTypes.SET_ONLINE_MODE);

const getDownloadedPodcasts = createPayloadAction<void>(
  ActionTypes.GET_DOWNLOADED_PODCASTS
);

const getDownloadedPodcastsSuccess = createPayloadAction<IDownloadSource[]>(
  ActionTypes.GET_DOWNLOADED_PODCASTS_SUCCESS
);

const getDownloadedPodcastsFailure = createPayloadAction<void>(
  ActionTypes.GET_DOWNLOADED_PODCASTS_FAILURE
);

const addToQueue = createPayloadAction<IMediaModel>(ActionTypes.ADD_TO_QUEUE);

const addJobId = createPayloadAction<IDownloadSource>(ActionTypes.ADD_JOB_ID);

const startDownload = createPayloadAction<IMediaModel>(
  ActionTypes.START_DOWNLOAD
);

const startDownloadSuccess = createPayloadAction<IDownloadSource>(
  ActionTypes.START_DOWNLOAD_SUCCESS
);

const startDownloadFailed = createPayloadAction<IDownloadSource>(
  ActionTypes.START_DOWNLOAD_FAILED
);

const setDownloadProgress = createPayloadAction<IDownloadSource>(
  ActionTypes.SET_DOWNLOAD_PROGRESS
);

const updateDownloadedMedia = createPayloadAction<IDownloadSource[]>(
  ActionTypes.UPDATE_DOWNLOADED_MEDIA
);

export const Actions = {
  setOfflineMode,
  setOnlineMode,
  getDownloadedPodcasts,
  getDownloadedPodcastsSuccess,
  getDownloadedPodcastsFailure,
  startDownload,
  startDownloadSuccess,
  startDownloadFailed,
  setDownloadProgress,
  updateDownloadedMedia,
  addToQueue,
  addJobId,
};
