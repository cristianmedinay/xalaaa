/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISimpleKeyModelBase } from "./ISimpleKeyModelBase";

export interface IDictionaryModelBase extends ISimpleKeyModelBase {
  Guid: string;

  Code: string;

  Name: string;

  Description: string;

  Sequence: number;

  UpToDate: boolean;
}
