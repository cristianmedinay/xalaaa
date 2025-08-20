/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface IPaymentErrorStatusModel {
  Message: string;
  ErrorDetail: {
    Message: string;
    StackTrace: string;
    ErrorDetail: {
      Message: string;
      StackTrace: string;
    };
  };
}
