/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IUserDeviceModel } from "../User";

export interface IConfirmAccountWithPasswordModel {
  Email: string;
  Token: string;
  Password?: string;
  ConfirmPassword?: string;
  Device?: IUserDeviceModel;
}
