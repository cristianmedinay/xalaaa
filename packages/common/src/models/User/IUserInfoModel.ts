/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IDidomiDataModel } from "./IDidomiDataModel";
import { IUserProductModel } from "./IUserProductModel";

export interface IUserInfoModel {
  Id: number;

  UserName?: string;

  FullName?: string;

  Email?: string;

  Initials?: string;

  AvatarUrl?: string;

  PhoneNumber?: boolean;

  ClientRoles?: string[];

  Products?: IUserProductModel[];

  DidomiData?: IDidomiDataModel;
}
