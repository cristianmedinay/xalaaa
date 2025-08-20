/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ScreenType } from "../../enums";

import { IApplicationFooterItemComponentModel } from "./IApplicationFooterItemComponentModel";
import { IScreenModel } from "./IScreenModel";

export interface IApplicationFooterScreenModel extends IScreenModel {
  ScreenTypeCode: typeof ScreenType.ApplicationFooter;

  Components?: IApplicationFooterItemComponentModel[];

  BackgroundUrl?: string;

  Columns?: number;

  ItemsAlignment?: string;

  Name?: string;
}
