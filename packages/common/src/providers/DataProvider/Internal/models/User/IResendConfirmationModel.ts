/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IUsersSearchFilterModel } from "./IUsersSearchFilterModel";

export interface IResendConfirmationModel {
  SearchFilter: IUsersSearchFilterModel;

  TokenValidationTime?: string;
}
