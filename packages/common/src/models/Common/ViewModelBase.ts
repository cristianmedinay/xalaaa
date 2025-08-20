/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { RecordStatus } from "../../enums";

import { IModelBase } from "./IModelBase";

export class ViewModelBase implements IModelBase {
  RecordStatus: RecordStatus = RecordStatus.NoChange;

  RowVersion?: string;
}
