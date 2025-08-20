/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ScreenType } from "../../enums";

import { IApplicationHeaderItemComponentModel } from "./IApplicationHeaderItemComponentModel";
import { IScreenModel } from "./IScreenModel";

export interface IApplicationHeaderScreenModel extends IScreenModel {
  ScreenTypeCode: typeof ScreenType.ApplicationHeader;

  Components?: IApplicationHeaderItemComponentModel[];
}
