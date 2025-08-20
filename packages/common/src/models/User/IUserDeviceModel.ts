/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { PlatformType } from "../../enums";

export interface IUserDeviceModel {
  Name?: string;

  PlatformCode?: PlatformType;

  FirebaseToken?: string;
}
