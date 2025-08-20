/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { RecordStatus } from "../../enums";

export interface IAssetCategoryModel {
  CategoryId?: number;

  CategoryCode?: string;

  CategoryName?: string;

  AssetCategoryCode?: string;

  AssetCategoryId?: number;

  AssetCategoryName?: string;

  AssetTypeId?: number;

  AssetTypeName?: string;

  Guid?: string;

  Code?: string;

  Name?: string;

  Description?: string;

  Sequence?: number;

  UpToDate?: boolean;

  Id?: number;

  RecordStatus?: RecordStatus;

  RowVersion?: string;
}
