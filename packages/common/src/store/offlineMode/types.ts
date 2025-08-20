/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Actions } from "./actions";

export type OfflineModeActionTypes =
  | ReturnType<typeof Actions.setOfflineMode>
  | ReturnType<typeof Actions.setOnlineMode>
  | ReturnType<typeof Actions.getDownloadedPodcasts>
  | ReturnType<typeof Actions.getDownloadedPodcastsSuccess>
  | ReturnType<typeof Actions.getDownloadedPodcastsFailure>
  | ReturnType<typeof Actions.startDownload>
  | ReturnType<typeof Actions.startDownloadSuccess>
  | ReturnType<typeof Actions.startDownloadFailed>
  | ReturnType<typeof Actions.setDownloadProgress>
  | ReturnType<typeof Actions.updateDownloadedMedia>;
