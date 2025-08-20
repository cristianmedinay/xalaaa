/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IUserPurchasesModel } from "@xala/common";

export interface ITableRowProps {
  purchase: IUserPurchasesModel;
}

export enum StatusFilter {
  All = "All",
  Active = "Active",
  Inactive = "Inactive",
}
