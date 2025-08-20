/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IModelBase } from "./IModelBase";

export interface ICurrencyModel extends IModelBase {
  Id: number;
  Code: string;
  Guid?: string;
  Name: string;
  Sequence?: number;
  UpToDate?: boolean;
  MinPayment: number;
}
