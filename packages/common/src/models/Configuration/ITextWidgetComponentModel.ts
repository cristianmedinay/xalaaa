/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ComponentType } from "../../enums";

import { IComponentBaseModel } from "./IComponentBaseModel";

export interface ITextWidgetComponentModel extends IComponentBaseModel {
  ComponentTypeCode: typeof ComponentType.TextWidget;

  BackgroundColor?: string;

  Content?: string;

  FontColor?: string;

  ImageLink?: string;

  IsBrandingVisible?: boolean;

  Title?: string;
}
