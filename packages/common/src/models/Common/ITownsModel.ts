/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { IModelBase } from "./IModelBase";

export interface ITownsModel extends IModelBase {
  Id: number;
  Guid: string;
  Code: string;
  Name: string;
  Description: string;
  Sequence: number;
  UpToDate: boolean;
}
