/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ScreenType } from "../../enums";

import { IApplicationMenuItemComponentModel } from "./IApplicationMenuItemComponentModel";
import { IScreenModel } from "./IScreenModel";

export interface IApplicationMenuScreenModel extends IScreenModel {
  ScreenTypeCode: typeof ScreenType.ApplicationMenu;

  Components?: IApplicationMenuItemComponentModel[];
}
