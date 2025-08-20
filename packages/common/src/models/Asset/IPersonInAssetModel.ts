/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IModelBase } from "../Common";

export interface IPersonInAssetModel extends IModelBase {
  AssetId?: number;

  AssetPersonId?: number;

  AssetPersonFullName?: string;

  PersonInAssetRoleCode?: string;

  PersonInAssetRoleDisplayName?: string;
}
