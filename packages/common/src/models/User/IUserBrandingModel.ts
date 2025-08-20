/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IModelBase, UploadFileInfoModel } from "../Common";

export interface IUserBrandingModel extends IModelBase {
  UserId?: number;

  WallpaperUrl?: string;

  WallpaperPath?: string;

  WallpaperFile?: File;

  WallpaperUploadInfo?: UploadFileInfoModel;
}
