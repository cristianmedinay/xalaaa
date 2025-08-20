/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IUserDeviceModel } from "../User/IUserDeviceModel";

export interface IRegisterConfirmEmailModel {
  Email: string;

  Token: string;

  Device?: IUserDeviceModel;
}
