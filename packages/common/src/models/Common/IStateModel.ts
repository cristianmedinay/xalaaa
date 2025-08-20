/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IErrorModel } from "./IErrorModel";

export interface IStateModel<T = Record<string, any>> {
  Data?: T;

  Error?: IErrorModel;

  IsProcessing?: boolean;
}
