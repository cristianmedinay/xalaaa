/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IListModelBase } from "../Common";

import { IAssetModel } from "./IAssetModel";
import { IAssetSearchFilterModel } from "./IAssetSearchFilterModel";

export type IAssetListModel = IListModelBase<
  IAssetModel,
  IAssetSearchFilterModel
>;
