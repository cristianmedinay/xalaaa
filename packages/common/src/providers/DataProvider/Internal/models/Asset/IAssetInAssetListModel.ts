/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAssetInAssetModel, IListModelBase } from "../../../../../models";

import { IAssetInAssetSearchFilterModel } from "./IAssetInAssetSearchFilterModel";

export type IAssetInAssetListModel = IListModelBase<
  IAssetInAssetModel,
  IAssetInAssetSearchFilterModel
>;
