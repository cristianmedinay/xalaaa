/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISearchFilterModelBase } from "../../../../../models";

export interface IAssetPriceSearchFilterModel extends ISearchFilterModelBase {
  AssetId?: number;
  AssetPurchasePeriodTypes?: string[];
  AvailableFromFrom?: string;
  AvailableFromTo?: string;
  AvailableToFrom?: string;
  AvailableToTo?: string;
}
