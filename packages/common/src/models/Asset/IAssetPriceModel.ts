/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IModelBase } from "..";

export interface IAssetPriceModel extends IModelBase {
  Id: number;
  AssetId: number;
  AssetTitle?: string;
  AssetTypeCode?: string;
  AssetTypeDisplayName?: string;
  AssetPurchasePeriodTypeCode: string;
  AssetPurchasePeriodTypeName?: string;
  Price: number;
  CurrencyId: number;
  CurrencyCode?: string;
  AvailableFrom: string;
  AvailableTo?: string;
}
