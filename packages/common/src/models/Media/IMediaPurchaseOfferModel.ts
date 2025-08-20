/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface IMediaPurchaseOfferModel {
  MediaId: number;
  MediaTitle?: string;
  MediaTypeCode: string;
  MediaTypeDisplayName?: string;
  PurchasePeriodTypeCode: string;
  PurchasePeriodTypeName?: string;
  Price: number;
  PriceId: number;
  CurrencyId: number;
  CurrencyCode?: string;
}
