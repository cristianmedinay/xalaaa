/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IErrorModel,
  IPaymentErrorStatusModel,
  IPaymentListModel,
  IPaymentModel,
  IPaymentSearchFilterModel,
} from "../../models";

import * as Consts from "./consts";

export interface IPaymentsState {
  payments: IPaymentListModel;
  status: IPaymentModel;
  error: any;
}

export interface IGetPaymentStatusAction {
  key: string;
  type: typeof Consts.GET_PAYMENT_STATUS;
}

export interface IGetPaymentStatusSuccessAction {
  payload: IPaymentModel;
  type: typeof Consts.GET_PAYMENT_STATUS_SUCCESS;
}

export interface IGetPaymentStatusErrorAction {
  error?: IPaymentErrorStatusModel;
  type: typeof Consts.GET_PAYMENT_STATUS_FAILURE;
}

export interface ISearchPaymentAction {
  filter: IPaymentSearchFilterModel;
  type: typeof Consts.SEARCH_PAYMENT;
}

export interface ISearchPaymentSuccessAction {
  payload: IPaymentListModel;
  type: typeof Consts.SEARCH_PAYMENT_SUCCESS;
}

export interface ISearchPaymentErrorAction {
  error?: IErrorModel;
  type: typeof Consts.SEARCH_PAYMENT_FAILURE;
}

export type PaymentActionsTypes =
  | IGetPaymentStatusAction
  | IGetPaymentStatusSuccessAction
  | IGetPaymentStatusErrorAction
  | ISearchPaymentAction
  | ISearchPaymentSuccessAction
  | ISearchPaymentErrorAction;
