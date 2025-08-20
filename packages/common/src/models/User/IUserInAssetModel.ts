/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISimpleKeyModelBase } from "../Common";

export interface IUserInAssetModel extends ISimpleKeyModelBase {
  UserId: number;
  UserFullName?: string;
  UserAvatarUrl?: string;
  UserProfiles?: string[];
  Role: string;
  RoleDisplayName?: string;
  Active?: boolean;
  Pending?: boolean;
  Profit: number;
}
