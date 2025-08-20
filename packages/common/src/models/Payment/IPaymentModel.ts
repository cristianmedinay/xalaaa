/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { PaymentStatus } from "../../enums";
import { IAssetPaymentModel } from "../Asset";
import { IModelBase } from "../Common";

export interface IPaymentModel extends IModelBase {
  Id: number;

  Guid: string;

  PaymentKey?: string;

  StatusCode: PaymentStatus;

  StatusDisplayName: string;

  TypeCode: string;

  TypeDisplayName: string;

  TotalAmount: number;

  Currency: string;

  Description: string;

  CreatedBy: number;

  Created: string;

  PaymentMethod?: string;

  PaymentEmail?: string;

  UserFullName?: string;

  UserId?: number;

  AssetPayment?: IAssetPaymentModel;
}
