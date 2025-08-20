/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ActionType, ScreenType } from "../../enums";

export interface IActionModel {
  ActionType?: ActionType;

  ScreenType?: ScreenType;

  ScreenTypeCode?: ScreenType;

  ScreenId?: number;

  ScreenName?: string;

  Url?: string;

  PhoneNo?: string;

  Email?: string;

  Title?: string;

  QueryParams?: { [key: string]: string | number | boolean };

  ComponentId?: string;
}
