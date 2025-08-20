/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ActionsObservable, ofType } from "redux-observable";
import { switchMap } from "rxjs/operators";

import { IErrorModel } from "../../models/Common";
import { DataProvider } from "../../providers/DataProvider";

import * as Actions from "./actions";
import * as Consts from "./consts";
import * as Types from "./types";

const searchPaymentEpic = (
  action$: ActionsObservable<Types.ISearchPaymentAction>
) =>
  action$.pipe(
    ofType(Consts.SEARCH_PAYMENT),
    switchMap((action) =>
      DataProvider.searchPayment(action.filter)
        .then((data) => {
          data.Filter = action.filter;
          return Actions.searchPaymentSuccess(data);
        })
        .catch((error: IErrorModel) => Actions.searchPaymentFailure(error))
    )
  );

export const paymentsEpics = [searchPaymentEpic];
