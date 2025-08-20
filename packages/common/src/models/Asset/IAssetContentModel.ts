/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AssetContentType, ContentStatus } from "../../enums";
import { IModelBase, UploadFileInfoModel } from "../Common";

export interface IAssetContentModel extends IModelBase {
  Id?: number;

  Guid?: string;

  AssetId?: number;

  ContentTypeCode?: AssetContentType;

  ContentTypeDisplayName?: string;

  ContentStatusCode?: ContentStatus;

  ContentStatusDisplayName?: string;

  StreamTypeCode?: string;

  StreamTypeDisplayName?: string;

  Path?: string;

  Url?: string;

  UploadInfo?: UploadFileInfoModel;
}
