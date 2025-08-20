/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IUserConsentModel, IUserDeviceModel } from "../User";

export interface IRegisterRequestEmailModel {
  Email: string;
  Password: string;
  ConfirmPassword?: string;
  FullName?: string;
  Name?: string;
  Surname?: string;
  DateOfBirth?: string;
  Device?: IUserDeviceModel;
  Consents?: IUserConsentModel[];
  LiveChannelId1?: number;
  LiveChannelId2?: number;
  CategoryId1?: number;
  CategoryId2?: number;
  CategoryId3?: number;
  CategoryId4?: number;
  CategoryId5?: number;
  TownId1?: number;
  TownId2?: number;
  PreferredLanguageCode?: string;
  Origin?: string;
  OriginRedirectUrl?: string;
}
