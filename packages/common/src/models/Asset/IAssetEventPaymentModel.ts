/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface IAssetEventPaymentModel {
  IsPremium?: boolean;

  Purchased?: boolean;

  Price?: number;

  CurrencyCode?: string;

  CurrencyId?: number;
}
