/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IUserConsentModel } from "models";

import { ScreenFrameType, ScreenRenderMode, ScreenType } from "../../enums";

import { IComponentModel } from "./IComponentModel";

export interface IScreenModel {
  Id?: number;

  Name?: string;

  ScreenTypeCode?: ScreenType;

  ScreenFrameTypeCode?: ScreenFrameType;

  ScreenRenderModeCode?: ScreenRenderMode;

  Components?: IComponentModel[];

  BrandingId?: string;

  Data?: IUserConsentModel[] | string;
}
