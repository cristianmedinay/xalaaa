/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISearchFilterModelBase } from "../../../../../models";

export interface IUsersInAssetSearchFilterModel extends ISearchFilterModelBase {
  AssetId?: number;
  UserId?: number;
  Active?: boolean;
  Pending?: boolean;
}
