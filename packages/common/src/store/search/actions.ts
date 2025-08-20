/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { createPayloadAction } from "../utils";

import { ActionTypes } from "./consts";
import { ISearchFilterPayload } from "./types";

const setFilter = createPayloadAction<ISearchFilterPayload>(
  ActionTypes.SET_FILTER
);

const reset = createPayloadAction<void>(ActionTypes.RESET);

export const Actions = {
  setFilter,
  reset,
};
