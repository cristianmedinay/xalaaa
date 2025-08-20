/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

export interface IDidomiDataModel {
  OrganizationUserId?: string;

  OrganizationUserIdAuthAlgorithm?: string;

  OrganizationUserIdAuthDigest?: string;

  OrganizationUserIdAuthSalt?: string;

  OrganizationUserIdAuthSid?: string;

  OrganizationUserIdExp?: number;
}
