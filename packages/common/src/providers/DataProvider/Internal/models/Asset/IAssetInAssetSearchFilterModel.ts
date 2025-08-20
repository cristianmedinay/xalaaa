/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISearchFilterModelBase } from "../../../../../models";

export interface IAssetInAssetSearchFilterModel extends ISearchFilterModelBase {
  AssetParentId?: number;
  AssetId?: number;
  AssetIds?: number[];
  AssetTypes?: string[];
}
