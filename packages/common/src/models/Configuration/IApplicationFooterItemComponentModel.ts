/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ComponentType } from "../../enums";

import { IActionModel } from "./IActionModel";
import { IComponentBaseModel } from "./IComponentBaseModel";

export interface IApplicationFooterItemComponentModel
  extends IComponentBaseModel {
  ComponentTypeCode: typeof ComponentType.ApplicationFooterItem;

  Title?: string;

  TitleTranslationKey?: string;

  Action?: IActionModel;

  SourceType?: string;

  SourceId?: number;

  IconUrl?: string;

  ImageLink?: string;
}
