/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IListModelBase } from "../../../../../models";

import { IAssetCategoriesSearchFilterModel } from "./IAssetCategoriesSearchFilterModel";
import { IAssetCategoryModel } from "./IAssetCategoryModel";

export type IAssetCategoriesListModel = IListModelBase<
  IAssetCategoryModel,
  IAssetCategoriesSearchFilterModel
>;
