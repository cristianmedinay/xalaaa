/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ComponentType } from "../../enums";

import { IComponentBaseModel } from "./IComponentBaseModel";
import { IBannerComponentItemModel } from "./IBannerComponentItemModel";

export interface IBannerComponentModel extends IComponentBaseModel {
  ComponentTypeCode: typeof ComponentType.Banner;
  Items: IBannerComponentItemModel[];
}
