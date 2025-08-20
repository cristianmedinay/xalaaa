/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IErrorModel } from "../Common";

import { IMediaModel } from "./IMediaModel";
import { IMediaSearchCategories } from "./IMediaSearchCategories";
import { IMediaSearchFilterModel } from "./IMediaSearchFilterModel";
import { IMediaSuggestionModel } from "./IMediaSuggestionModel";

export interface IMediaSearchStateModel {
  Entities: IMediaModel[];

  TotalCount: number;

  IsLoading?: boolean;

  Filter?: IMediaSearchFilterModel;

  Error?: IErrorModel;

  Suggestions?: IMediaSuggestionModel[];

  Title?: string;

  AllPagesCategories?: IMediaSearchCategories[];
}
