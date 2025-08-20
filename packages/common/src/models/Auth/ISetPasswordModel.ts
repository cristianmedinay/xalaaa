/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface ISetPasswordModel {
  Id: number;

  Password?: string;

  ConfirmPassword: string;

  Code: string;
}
