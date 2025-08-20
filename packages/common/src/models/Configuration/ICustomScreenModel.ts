/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ScreenType } from "../../enums";

import { IScreenModel } from "./IScreenModel";

export interface ICustomScreenModel extends IScreenModel {
  ScreenTypeCode: typeof ScreenType.Custom;
}
