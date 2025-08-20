/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaSearchFilterModel } from "../../models";

import { Actions } from "./actions";

export type SearchActionTypes =
  | ReturnType<typeof Actions.setFilter>
  | ReturnType<typeof Actions.reset>;

export interface ISearchState {
  filter: IMediaSearchFilterModel;
  previousFilter: IMediaSearchFilterModel;
}

export interface ISearchFilterPayload {
  filter: IMediaSearchFilterModel;
  force?: boolean;
}
