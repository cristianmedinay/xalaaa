/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ComponentType, ImageType } from "../../enums";

import { IActionModel } from "./IActionModel";
import { IComponentBaseModel } from "./IComponentBaseModel";

export interface IImageComponentModel extends IComponentBaseModel {
  ComponentTypeCode: typeof ComponentType.Image;

  BackgroundUrl?: string;

  ImageType?: ImageType;

  ImageText?: string;

  Action?: IActionModel;

  SourceType?: string;

  SourceId?: number;
}
