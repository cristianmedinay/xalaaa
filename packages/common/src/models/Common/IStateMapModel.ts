/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IStateModel } from "./IStateModel";

export interface IStateMapModel<T = Record<string, any>> {
  [key: string]: IStateModel<T>;
}
