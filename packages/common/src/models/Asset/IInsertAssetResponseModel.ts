/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { UploadFileInfoModel } from "../Common";

export interface IInsertAssetResponseModel {
  AssetId: number;
  Content: {
    UploadInfo: UploadFileInfoModel;
  };
}
