/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { RecordStatus } from "../../enums";
import {
  ISimpleKeyModelBase,
  IUploadContentModel,
  UploadFileInfoModel,
} from "../Common";

import { IUserBrandingModel } from "./IUserBrandingModel";
import { IUserProfileModel } from "./IUserProfileModel";

export interface IUserModel extends ISimpleKeyModelBase {
  CanLogin?: boolean;

  Guid?: string;

  UserName?: string;

  FullName?: string;

  FirstName?: string;

  Surname?: string;

  DateOfBirth?: string;

  IsAuthenticated?: boolean;

  Email?: string;

  NormalizedEmail?: string;

  Initials?: string;

  PhoneNumber?: string;

  PhoneNumberConfirmed?: boolean;

  Locked?: boolean;

  EmailConfirmed?: boolean;

  RestrictionLevelCode?: string;

  ExternalSource?: boolean;

  AvatarUrl?: string;

  AvatarPath?: string;

  AvatarFile?: File | IUploadContentModel;

  AvatarUploadInfo?: UploadFileInfoModel;

  Roles?: (
    | string
    | {
        RecordStatus: RecordStatus;
        RoleId: number;
        RoleName: string;
        RoleNormalizedName: string;
        RoleType: string;
        RowVersion: string;
      }
  )[];

  Profiles?: IUserProfileModel[];

  Branding?: IUserBrandingModel;

  ClientRoles?: string[];

  Origin?: string;
}
