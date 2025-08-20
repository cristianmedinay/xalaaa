/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface IResetPasswordRequestModel {
  Id?: string;

  Email?: string;

  Password?: string;

  ConfirmPassword?: string;

  Token?: string;

  RecipientGuid?: string;
}
