/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IErrorModel } from "../Common";

import { IMediaModel } from "./IMediaModel";

export interface IMediaStateModel {
  Media?: IMediaModel;

  Error?: IErrorModel;

  IsLoading?: boolean;
}
