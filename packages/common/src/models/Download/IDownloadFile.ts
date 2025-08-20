/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { DownloadMediaStatus } from "../../enums";

export interface IDownloadFile {
  ContentUrl: string;
  downloadStatus?: DownloadMediaStatus;
  downloadProgress?: number;
  validTo?: Date;
}
