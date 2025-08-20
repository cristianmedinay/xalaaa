/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaListType } from "../../enums";
import { ISearchFilterModelBase } from "../../models";

import { IMediaListMediaOptionsModel } from "./IMediaListMediaOptionsModel";

export interface IMediaListOptionsModel extends ISearchFilterModelBase {
  MediaListId: number;

  Type?: MediaListType;

  IncludeCategories?: boolean;

  IncludeImages?: boolean;

  IncludeMedia?: boolean;

  IncludeAllPagesCategories?: boolean;

  Categories?: number[];

  MediaOptions?: IMediaListMediaOptionsModel;

  QueryParams?: { [key: string]: string | number | boolean };
}
