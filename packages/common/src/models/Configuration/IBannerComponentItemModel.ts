/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ComponentType } from "../../enums";

import { IActionModel } from "./IActionModel";

export interface IBannerComponentItemModel {
  Action?: IActionModel;
  ComponentTypeCode?: ComponentType;
  Id: number;
  ImageLink?: string;
  IsVisible: boolean;
  Name: string;
  Title?: string;
}
