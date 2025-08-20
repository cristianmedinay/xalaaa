/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IModelBase } from "../Common";

export interface IAssetInAssetModel extends IModelBase {
  AssetId: number;
  AssetTitle?: string;
  AssetTypeCode?: string;
  AssetTypeDisplayName?: string;
  Sequence?: number;
  AssetParentId: number;
  AssetParentTitle?: string;
  AssetParentTypeCode?: string;
  AssetParentTypeDisplayName?: string;
}
