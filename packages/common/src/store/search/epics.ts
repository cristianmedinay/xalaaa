/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ActionsObservable, ofType, StateObservable } from "redux-observable";
import { EMPTY, of } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";

import { IAppState } from "store/types";

import { MIN_SEARCH_LENGTH } from "../../constants";
import { Actions as MediaActions } from "../media";

import { ActionTypes } from "./consts";
import { SearchActionTypes } from "./types";

const searchMediaEpic = (
  actions$: ActionsObservable<SearchActionTypes>,
  state: StateObservable<IAppState>
) =>
  actions$.pipe(
    ofType(ActionTypes.SET_FILTER),
    debounceTime(200),
    switchMap((action: any) => {
      const previousFilter: any = state.value.search.previousFilter;
      const currentFilter: any = action.payload?.filter;
      const emptyObj = JSON.stringify({});
      if (
        previousFilter.Categories?.[0] !== currentFilter.Categories?.[0] ||
        (previousFilter.FullTextSearch !== currentFilter?.FullTextSearch &&
          ((currentFilter?.FullTextSearch?.length || 0) >= MIN_SEARCH_LENGTH ||
            (currentFilter?.FullTextSearch?.length === 0 &&
              currentFilter?.FullTextSearch?.length <
                previousFilter?.FullTextSearch?.length))) ||
        (JSON.stringify(previousFilter) === emptyObj &&
          JSON.stringify(currentFilter) !== emptyObj) ||
        (action.payload as any)?.force
      ) {
        return of(
          MediaActions.searchMedia({
            IncludeCategories: true,
            IncludeImages: true,
            PageSize: 12,
            ...currentFilter,
          })
        );
      }
      return EMPTY;
    })
  );

export const SearchEpics = [searchMediaEpic];
