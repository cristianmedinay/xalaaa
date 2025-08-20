/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { createReducers, IPayloadAction } from "../utils";

import { ActionTypes } from "./consts";
import { ISearchFilterPayload, ISearchState } from "./types";

export const initialState: ISearchState = {
  filter: {},
  previousFilter: {},
};

export const searchReducers = createReducers(initialState, {
  [ActionTypes.SET_FILTER]: (
    state,
    action: IPayloadAction<ISearchFilterPayload>
  ) =>
    ({
      ...state,
      filter: { ...state.filter, ...action.payload?.filter },
      previousFilter: { ...state.filter },
    } as ISearchState),
  [ActionTypes.RESET]: () =>
    ({
      ...initialState,
    } as ISearchState),
});
