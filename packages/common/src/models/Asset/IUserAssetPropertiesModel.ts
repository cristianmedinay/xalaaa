/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAssetTimestampModel } from "./IAssetTimestampModel";

export interface IUserAssetPropertiesModel {
  AssetId: number;

  Timestamp?: IAssetTimestampModel;

  IsFavorite?: boolean;
}
