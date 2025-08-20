/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IUserInAssetModel } from "./IUserInAssetModel";

export interface IInviteManyUsersModel {
  AssetId: number;
  Users: IUserInAssetModel[];
}
