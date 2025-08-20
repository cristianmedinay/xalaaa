/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IModelBase } from "../Common";

export interface IUserRoleModel extends IModelBase {
  UserId?: number;

  RoleId?: number;

  RoleName?: string;

  RoleNormalizedName?: string;
}
