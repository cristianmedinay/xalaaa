/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IAppState,
  ROUTES,
  UrlHelper,
  useAnalyticsContext,
} from "@xala/common";
import cx from "classnames";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import { Input } from "..";

import "./GlobalSearch.scss";

import SearchIcon from "resources/icons/search.svg";

import { shallowEqual, useSelector } from "react-redux";

interface IGlobalSearch {
  headerRef: React.RefObject<HTMLDivElement>;
}

export const GlobalSearch = ({ headerRef }: IGlobalSearch) => {
  const [focused, setFocused] = useState<boolean>();
  const searchState = useSelector(
    (state: IAppState) => state.media.mediaSearch,
    shallowEqual
  );
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const query = UrlHelper.parse(history.location.search) as { query?: string };
  const { search } = useAnalyticsContext();

  useEffect(() => {
    if (focused || query.query) {
      headerRef.current?.classList.add("AppHeader--search");
    } else {
      headerRef.current?.classList.remove("AppHeader--search");
    }

    return () => {
      headerRef.current?.classList.remove("AppHeader--search");
    };
  }, [focused, query, headerRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (location.pathname === ROUTES.SEARCH_SCREEN) {
      history.replace({
        pathname: ROUTES.SEARCH_SCREEN,
        search: UrlHelper.joinQueries(history.location.search, {
          query: e.target.value,
        }),
      });
    } else if (e.target.value.length >= 3) {
      history.push({
        pathname: ROUTES.SEARCH_SCREEN,
        search: UrlHelper.joinQueries({ query: e.target.value }),
      });
    }
  };

  const isEmpty = Boolean(Object.keys(query).length);

  useEffect(() => {
    if (searchState.IsLoading && isEmpty) {
      search(query as string);
    }
  }, [searchState.IsLoading, isEmpty]);

  return (
    <div
      className={cx("GlobalSearch", {
        "GlobalSearch--value": query.query,
        "GlobalSearch--focused": focused,
      })}
    >
      <label htmlFor="GlobalSearch" className="label--hidden">
        {t("SEARCH__INPUT_LABEL", "Search")}
      </label>
      <Input
        id="GlobalSearch"
        allowClear={true}
        autoFocus={!!query.query}
        value={query.query}
        placeholder={t("SEARCH__INPUT_PLACEHOLDER", "Title, Description")}
        suffix={
          <div className="Search__icon">
            <SearchIcon />
          </div>
        }
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};
