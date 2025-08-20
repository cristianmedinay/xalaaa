/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface IMediaPaymentResponseModel {
  PaymentId: string;
  RedirectUrl: string;
  MessageKey: string;
  Message: string;
  Provider: string;
}
