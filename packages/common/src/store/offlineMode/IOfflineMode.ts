/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { IDownloadSource } from "models";

export interface IOfflineMode {
  isOnline: boolean;
  media: IDownloadSource[];
  loadingPodcasts: boolean;
}
