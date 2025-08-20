/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import {
  AlignType,
  CellType,
  ComponentType,
  ElevationLevel,
  Orientation,
} from "../../enums";
import { IMediaModel } from "../../models";

import { IActionModel } from "./IActionModel";
import { IComponentBaseModel } from "./IComponentBaseModel";
import { IComponentLayoutModel } from "./IComponentLayoutModel";
import { IMediaContextOptionsModel } from "./IMediaContextOptionsModel";

export interface IListComponentModel extends IComponentBaseModel {
  ComponentTypeCode: typeof ComponentType.List;

  Title?: string;

  TitleTranslationKey?: string;

  TitleUrl?: string;

  TitleAlign?: AlignType;

  TitleElevation?: ElevationLevel;

  VisibleItemsCount?: number;

  Orientation?: Orientation;

  CellType?: CellType;

  SourceType?: string;

  SourceId?: number;

  MediaList?: IMediaModel[];

  CreatorUserId?: string;

  Layout?: IComponentLayoutModel;

  Action?: IActionModel;

  MediaContextOptions?: IMediaContextOptionsModel;

  BrandingId?: string;
}
