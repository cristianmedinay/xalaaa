/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { RecordStatus } from "../../enums";

export interface IModelBase {
  RecordStatus?: RecordStatus;

  RowVersion?: string;
}
