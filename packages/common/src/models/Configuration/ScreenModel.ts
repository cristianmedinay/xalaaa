/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IApplicationFooterScreenModel } from "./IApplicationFooterScreenModel";
import { IApplicationHeaderScreenModel } from "./IApplicationHeaderScreenModel";
import { IApplicationMenuScreenModel } from "./IApplicationMenuScreenModel";
import { ICustomScreenModel } from "./ICustomScreenModel";
import { IScreenModel } from "./IScreenModel";

export type ScreenModel =
  | ICustomScreenModel
  | IApplicationMenuScreenModel
  | IApplicationHeaderScreenModel
  | IApplicationFooterScreenModel
  | IScreenModel;
