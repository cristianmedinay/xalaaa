/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface IResetPasswordModel {
  Id?: number;

  Password?: string;

  NewPassword?: string;

  ConfirmPassword?: string;

  Email?: string;

  Token?: string;

  RecipientGuid?: string;
}
