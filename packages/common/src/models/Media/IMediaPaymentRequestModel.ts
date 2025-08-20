/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface IMediaPaymentRequestModel {
  MediaId: number;
  MediaPriceId: number;
  ChangePaymentMethod?: boolean;
  PreferredProvider?: string;
}
