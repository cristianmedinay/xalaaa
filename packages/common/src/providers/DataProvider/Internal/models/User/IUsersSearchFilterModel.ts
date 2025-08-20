/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISearchFilterModelBase } from "../../../../../models";

export interface IUsersSearchFilterModel extends ISearchFilterModelBase {
  UserName?: string;

  Email?: string;

  EmailConfirmed?: boolean;

  FullName?: string;

  Locked?: boolean;

  CanLogin?: boolean;

  PhoneNumber?: string;

  PhoneNumberConfirmed?: boolean;

  Roles?: number[];

  Profiles?: string[];

  ExcludeProfiles?: string[];

  ExternalSource?: boolean;

  IncludeProfile?: boolean;

  UserId?: number;
}
