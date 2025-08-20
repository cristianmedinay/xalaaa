/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISearchFilterModelBase } from "index";

export interface IAssetsInAssetSearchFilterModel
  extends ISearchFilterModelBase {
  AssetParentId?: number;
  AssetId?: number;
  AssetIds?: number[];
  AssetTypes?: string[];
}
