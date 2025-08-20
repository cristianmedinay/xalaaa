/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AuthResult } from "../../enums";

export interface ITokenModel {
  AuthResult?: AuthResult;

  RefreshToken?: string;

  Token?: string;

  TokenExpires?: string;

  Message?: string;
}
