/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IListModelBase } from "../../../../../models";

import { IAssetPeopleModel } from "./IAssetPeopleModel";
import { IAssetPeopleSearchFilterModel } from "./IAssetPeopleSearchFilterModel";

export type IAssetPeopleListModel = IListModelBase<
  IAssetPeopleModel,
  IAssetPeopleSearchFilterModel
>;
