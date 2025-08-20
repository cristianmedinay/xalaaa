/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IModelBase } from "../Common";

export interface IUserConsentModel extends IModelBase {
  UserId: number;

  Accepted?: boolean;

  ConsentId: number;

  ConsentCode: string;

  ConsentName: string;

  ConsentNameTranslationKey?: string;

  ConsentUpToDate: boolean;

  ConsentRequired: boolean;

  ConsentContentUrl: string;

  ConsentContent: string;

  ConsentContentType?: string;

  NeedConsent: boolean;

  ConsentVersion: number;

  AcceptedVersion?: number;
}
