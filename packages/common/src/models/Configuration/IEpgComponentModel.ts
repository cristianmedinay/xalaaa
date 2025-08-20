/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ComponentType } from "../../enums";
import { IMediaModel } from "../../models";

import { IActionModel } from "./IActionModel";
import { IComponentBaseModel } from "./IComponentBaseModel";

export interface IEpgComponentModel extends IComponentBaseModel {
  ComponentTypeCode: typeof ComponentType.Epg;

  SourceId?: number;

  Assets?: IMediaModel[];

  Action?: IActionModel;

  SourceType?: string;
}
