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
import * as Types from "./types";

export const getPayments = (key: string): Types.PaymentActionsTypes => {
  return {
    key,
    type: Consts.GET_PAYMENT_STATUS,
  };
};

export const getPaymentStatusSuccess = (
  data: IPaymentModel
): Types.PaymentActionsTypes => {
  return {
    payload: data,
    type: Consts.GET_PAYMENT_STATUS_SUCCESS,
  };
};

export const getPaymentsStatusFailure = (
  error?: IPaymentErrorStatusModel
): Types.PaymentActionsTypes => {
  return {
    error,
    type: Consts.GET_PAYMENT_STATUS_FAILURE,
  };
};

export const searchPayment = (
  filter: IPaymentSearchFilterModel
): Types.ISearchPaymentAction => {
  return {
    filter,
    type: Consts.SEARCH_PAYMENT,
  };
};

export const searchPaymentSuccess = (
  data: IPaymentListModel
): Types.ISearchPaymentSuccessAction => {
  return {
    payload: data,
    type: Consts.SEARCH_PAYMENT_SUCCESS,
  };
};

export const searchPaymentFailure = (
  error?: IErrorModel
): Types.ISearchPaymentErrorAction => {
  return {
    error,
    type: Consts.SEARCH_PAYMENT_FAILURE,
  };
};

export const PaymentActions = {
  getPaymentStatusSuccess,
  getPayments,
  getPaymentsStatusFailure,
  searchPayment,
};
