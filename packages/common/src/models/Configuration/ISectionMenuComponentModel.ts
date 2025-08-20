/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ComponentType } from "../../enums";

import { IComponentBaseModel } from "./IComponentBaseModel";
import { ISectionMenuItemModel } from "./ISectionMenuItemModel";

export interface ISectionMenuComponentModel extends IComponentBaseModel {
  ComponentTypeCode: typeof ComponentType.SectionMenu;

  Items?: ISectionMenuItemModel[];

  BackgroundUrl?: string;
}
