/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IListModelBase } from "../Common";

import { IUserAssetPurchaseModel } from "./IUserAssetPurchaseModel";
import { IUserAssetPurchasesSearchFilterModel } from "./IUserAssetPurchasesSearchFilterModel";

export type IUserAssetPurchasesListModel = IListModelBase<
  IUserAssetPurchaseModel,
  IUserAssetPurchasesSearchFilterModel
>;
