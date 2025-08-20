/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IListModelBase } from "../Common";

import { IPaymentModel } from "./IPaymentModel";
import { IPaymentSearchFilterModel } from "./IPaymentSearchFilterModel";

export type IPaymentListModel = IListModelBase<
  IPaymentModel,
  IPaymentSearchFilterModel
>;
