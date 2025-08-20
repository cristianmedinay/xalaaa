/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { IUserDeviceModel } from "models/User/IUserDeviceModel";

export interface IAuthVerifyLoginModel {
  Id: string;
  Device: IUserDeviceModel;
}
