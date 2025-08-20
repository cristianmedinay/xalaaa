/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaPersonModel, PersonInAssetType } from "@xala/common";

export const formatRole = (
  people: IMediaPersonModel[],
  role: PersonInAssetType
): string =>
  people
    .filter((person) => person.PersonRoleCode === role)
    .map((person) => person.PersonFullName)
    .join(", ") || "";
