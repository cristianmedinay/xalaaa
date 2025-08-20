/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISearchFilterModelBase } from "../../models";

import { IMediaSuggestionModel } from "./IMediaSuggestionModel";

export interface IMediaSearchFilterModel extends ISearchFilterModelBase {
  Title?: string;

  Description?: string;

  Categories?: number[];

  Types?: string[];

  MinDurationMiliseconds?: number;

  MaxDurationMiliseconds?: number;

  YearFrom?: number;

  YearTo?: number;

  Director?: string;

  Writer?: string;

  Cast?: string;

  ExternalSources?: string[];

  Parents?: number[];

  AvailableFromFrom?: string;

  AvailableFromTo?: string;

  AvailableToFrom?: string;

  AvailableToTo?: string;

  StartDateTimeFrom?: string;

  StartDateTimeTo?: string;

  EndDateTimeFrom?: string;

  EndDateTimeTo?: string;

  CreatorUsers?: string[];

  Ids?: number[];

  Suggestion?: IMediaSuggestionModel;

  IncludeCategories?: boolean;

  IncludeImages?: boolean;

  Type?: string;

  MediaListId?: number;

  IncludeAllPagesCategories?: boolean;
}
