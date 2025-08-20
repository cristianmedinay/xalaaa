/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISearchFilterModelBase } from "./ISearchFilterModelBase";

export interface IDictionarySearchFilterModelBase
  extends ISearchFilterModelBase {
  Name?: string;

  Description?: number;

  UpToDate?: boolean;
}
