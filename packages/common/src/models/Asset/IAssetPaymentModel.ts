/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaType, PaymentStatus, RecordStatus } from "../../enums";

export interface IAssetPaymentModel {
  AssetId: number;

  AssetTitle: string;

  AssetTypeCode: MediaType;

  AssetTypeDisplayName: string;

  Completed: string;

  Created: string;

  Currency: string;

  PaymentId: number;

  PaymentStatusCode: PaymentStatus;

  PaymentTypeCode: string;

  Price: number;

  RecordStatus: RecordStatus;

  UpToDate: boolean;
}
