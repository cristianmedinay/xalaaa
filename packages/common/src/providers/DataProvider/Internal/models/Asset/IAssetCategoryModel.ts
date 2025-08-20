/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IModelBase } from "../../../../../models";

export interface IAssetCategoryModel extends IModelBase {
  Id?: number;

  AssetTypeId?: number;

  AssetTypeName?: string;

  Guid?: string;

  Code: string;

  Name: string;

  Description: string;

  Sequence: number;

  UpToDate: boolean;
}
