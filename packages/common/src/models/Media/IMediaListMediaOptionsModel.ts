/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaDayTimeFilter } from "../../enums";
import { ISearchFilterModelBase } from "../../models";

export interface IMediaListMediaOptionsModel extends ISearchFilterModelBase {
  ParentMediaId?: number;

  IncludeCategories?: boolean;

  IncludeImages?: boolean;

  Categories?: number[];

  DateFrom?: string;

  DayTime?: MediaDayTimeFilter;

  AvailableNow?: boolean;

  MediaIds?: number[];

  DaysCount?: number;
}
