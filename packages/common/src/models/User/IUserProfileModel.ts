/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IModelBase } from "../Common";

export interface IUserProfileModel extends IModelBase {
  UserId?: number;

  ProfileId?: number;

  ProfileCode?: string;

  ProfileName?: string;
}
