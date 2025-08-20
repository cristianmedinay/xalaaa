/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ComponentType } from "../../enums";

import { IActionModel } from "./IActionModel";
import { IComponentBaseModel } from "./IComponentBaseModel";

export interface IApplicationHeaderItemComponentModel
  extends IComponentBaseModel {
  ComponentTypeCode: typeof ComponentType.ApplicationHeaderItem;

  Title?: string;

  IconUrl?: string;

  IconResourceKey?: string;

  Action?: IActionModel;

  SourceType?: string;

  SourceId?: number;
}
