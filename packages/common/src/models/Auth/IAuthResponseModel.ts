/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IDidomiDataModel, IUserInfoModel } from "../User";

import { ITokenModel } from "./ITokenModel";

export interface IAuthResponseModel {
  User?: IUserInfoModel;

  AuthorizationToken?: ITokenModel;

  Version?: string;

  DidomiData?: IDidomiDataModel;
}
