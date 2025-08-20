/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ComponentType } from "../../enums";

export interface IComponentBaseModel {
  Id?: number;

  Name?: string;

  ComponentTypeCode?: ComponentType;

  IsVisible?: boolean;

  SourceId?: number;
}
