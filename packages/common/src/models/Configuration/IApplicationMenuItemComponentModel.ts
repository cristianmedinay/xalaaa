/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ComponentType } from "../../enums";

import { IActionModel } from "./IActionModel";
import { IComponentBaseModel } from "./IComponentBaseModel";

export interface IApplicationMenuItemComponentModel
  extends IComponentBaseModel {
  ComponentTypeCode: typeof ComponentType.ApplicationMenuItem;

  Title?: string;

  TitleTranslationKey?: string;

  IconUrl?: string;

  IconXml?: string;

  IconResourceKey?: string;

  Action?: IActionModel;

  SourceType?: string;

  SourceId?: number;
}
