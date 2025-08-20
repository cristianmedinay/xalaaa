/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAssetPriceModel, IListModelBase } from "../../../../../models";

import { IAssetPriceSearchFilterModel } from "./IAssetPriceSearchFilterModel";

export type IAssetPriceListModel = IListModelBase<
  IAssetPriceModel,
  IAssetPriceSearchFilterModel
>;
