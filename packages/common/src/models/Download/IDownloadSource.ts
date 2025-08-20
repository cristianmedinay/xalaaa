/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaModel, IMediaPlayInfoModel } from "../Media";

import { IDownloadFile } from "./IDownloadFile";

export interface IDownloadSource {
  media: IMediaModel;
  mediaPlayInfo?: IMediaPlayInfoModel;
  localFile?: IDownloadFile;
  jobId?: string;
}
