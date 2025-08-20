/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IDownloadSource } from "../../models";

export class DownloadService {
  static downloadMedia = (
    _: IDownloadSource,
    _1: (value: any) => void,
    _2: any
  ) => {
    return;
  };

  static removeFile = async (_: number, _media: IDownloadSource[]) => {
    return Promise.resolve();
  };
}
