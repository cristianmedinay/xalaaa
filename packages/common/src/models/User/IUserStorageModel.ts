/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IUserAssetPropertiesModel } from "../Asset";

import { IUserInfoModel } from "./IUserInfoModel";

export interface IUserStorageModel extends IUserInfoModel {
  assetsProperties?: IUserAssetPropertiesModel[];
}
