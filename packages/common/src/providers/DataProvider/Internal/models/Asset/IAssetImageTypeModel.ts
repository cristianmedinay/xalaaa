/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IModelBase } from "../../../../../models";

export interface IAssetImageTypeModel extends IModelBase {
  Code: string;

  TranslationKey: string;

  DisplayName: string;

  Sequence: number;
}
