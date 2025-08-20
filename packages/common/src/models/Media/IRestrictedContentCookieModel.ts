/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface IRestrictedContentCookieModel {
  Name: string;

  Value?: string;

  Expires?: Date;

  Path?: string;

  Domain?: string;

  IsSecure?: boolean;

  HttpOnly?: boolean;

  SameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None" | undefined;
}
