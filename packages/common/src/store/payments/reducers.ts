/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IPaymentModel } from "../..";
import { PaymentStatus, RecordStatus } from "../../enums";

import { IPaymentsState, PaymentActionsTypes } from "./types";

import { Consts } from ".";

export const initialState: IPaymentsState = {
  error: {},
  status: {
    Guid: "",
    Id: -1,
    StatusCode: PaymentStatus.Created,
    StatusDisplayName: "",
    TotalAmount: 3,
    TypeCode: "",
    TypeDisplayName: "",
    Currency: "",
    Description: "",
    CreatedBy: -1,
    Created: "",
    RecordStatus: RecordStatus.NoChange,
    RowVersion: "",
  },
  payments: {
    IsLoading: false,
    Entities: [],
    TotalCount: 0,
  },
};

export const paymentsReducer = (
  state = initialState,
  action: PaymentActionsTypes
): IPaymentsState => {
  switch (action.type) {
    case Consts.GET_PAYMENT_STATUS: {
      return {
        ...state,
      };
    }
    case Consts.GET_PAYMENT_STATUS_SUCCESS: {
      return {
        ...state,
        status: {
          ...action.payload,
        },
      };
    }
    case Consts.GET_PAYMENT_STATUS_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    case Consts.SEARCH_PAYMENT: {
      return {
        ...state,
        payments: {
          ...state.payments,
          IsLoading: true,
        },
      };
    }
    case Consts.SEARCH_PAYMENT_SUCCESS: {
      const pageNumber = action.payload?.Filter?.PageNumber;
      let entities: IPaymentModel[] = [];

      if (pageNumber === 1) {
        entities = action.payload.Entities;
      } else if (pageNumber && pageNumber > 1) {
        entities = [
          ...(state.payments.Entities || []),
          ...action.payload.Entities,
        ];
      }

      return {
        ...state,
        payments: {
          ...state.payments,
          ...action.payload,
          IsLoading: false,
          Entities: entities,
        },
      };
    }
    case Consts.SEARCH_PAYMENT_FAILURE: {
      return {
        ...state,
        payments: {
          ...state.payments,
          IsLoading: false,
          Error: action.error,
        },
      };
    }
    default:
      return state;
  }
};
