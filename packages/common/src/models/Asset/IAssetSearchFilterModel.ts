/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISearchFilterModelBase } from "../Common";

export interface IAssetSearchFilterModel extends ISearchFilterModelBase {
  Id?: number;

  Guid?: string;

  Name?: string;

  Title?: string;

  Description?: string;

  Categories?: number[];

  Types?: string[];

  AssetAgeRestrictionValueMins?: string[];

  CreatedByFullName?: string;

  Created?: string;

  RowVersion?: string;

  ExternalSources?: string[];

  IncludeChildAssets?: boolean;

  MinDurationMilliseconds?: number;

  MaxDurationMilliseconds?: number;

  YearFrom?: number;

  YearTo?: number;

  Director?: string;

  Writer?: string;

  Cast?: string;

  Parents?: number[];

  AvailableFromFrom?: string;

  AvailableFromTo?: string;

  AvailableToFrom?: string;

  AvailableToTo?: string;

  StartDateTimeFrom?: string;

  StartDateTimeTo?: string;

  EndDateTimeFrom?: string;

  EndDateTimeTo?: string;

  CreatorUsers?: number[];

  Ids?: number[];

  AgeRestrictionFrom?: number;

  AgeRestrictionTo?: number;

  Purchased?: boolean;

  IncludeImages?: boolean;

  AssetId?: number;
}
