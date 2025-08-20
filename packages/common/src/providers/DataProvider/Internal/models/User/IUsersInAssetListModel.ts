/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IListModelBase, IUserInAssetModel } from "../../../../../models";

import { IUsersInAssetSearchFilterModel } from "./IUsersInAssetSearchFilterModel";

export type IUsersInAssetListModel = IListModelBase<
  IUserInAssetModel,
  IUsersInAssetSearchFilterModel
>;
