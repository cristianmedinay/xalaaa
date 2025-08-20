/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IAppState,
  IMediaSearchCategories,
  MediaStore,
  UrlHelper,
} from "@xala/common";
import cx from "classnames";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router";

import GridIcon from "resources/icons/grid.svg";

import { Drawer } from "../..";

import "./MediaCategoryDrawer.scss";

const mediaListId = MediaStore.Consts.MEDIA_LIST_SEARCH_KEY;

export const MediaCategoryDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mediaSearchCategories = useSelector<
    IAppState,
    IMediaSearchCategories[]
  >(
    (state) =>
      state.media.mediaList[mediaListId] &&
      state.media.mediaList[mediaListId].AllPagesCategories
        ? state.media.mediaList[mediaListId].AllPagesCategories
        : state.media.mediaSearch.AllPagesCategories || [],
    shallowEqual
  );

  const history = useHistory();
  const { t } = useTranslation();

  const categoryName = useMemo(() => {
    return UrlHelper.parse(history.location.search).category;
  }, [history.location.search]);

  const onCategoryChange = (categoryId?: number) => {
    setIsOpen(false);

    history.replace({
      search: UrlHelper.joinQueries(history.location.search, {
        category: categoryId,
      }),
    });
  };

  return (
    <div>
      <div
        className="MediaCategoryDrawer__trigger"
        onClick={() => setIsOpen(true)}
      >
        <i className="MediaCategoryDrawer__trigger__icon">
          <GridIcon />
        </i>
        <span className="MediaCategoryDrawer__trigger__text">
          {t(
            "MEDIA_CATEGORY_DRAWER__ALL_GENRES_COLLECTIONS",
            "All Genres & Collections"
          )}
        </span>
      </div>

      <Drawer
        className="MediaCategoryDrawer"
        open={isOpen}
        width={700}
        placement="left"
        level={null}
        onClose={() => setIsOpen(false)}
        title={t("MEDIA_CATEGORY_DRAWER__HEADER", "Genres")}
      >
        <div className="MediaCategoryDrawer__body">
          <div className="MediaCategoryList">
            <div
              className={cx("MediaCategory", {
                "MediaCategory--active": !categoryName,
              })}
              onClick={() => onCategoryChange()}
            >
              {!categoryName && <div className="MediaCategory__indicator" />}
              <div className="MediaCategory__name">
                {t("MEDIA_CATEGORY_DRAWER__ALL_GENRES", "All categories")}
              </div>
            </div>

            {mediaSearchCategories.map((category) => (
              <div
                key={category.CategoryId}
                className={cx("MediaCategory", {
                  "MediaCategory--active":
                    categoryName &&
                    category.CategoryId === parseInt(categoryName, 10),
                })}
                title={category.CategoryName}
                onClick={() => onCategoryChange(category.CategoryId)}
              >
                {categoryName &&
                  category.CategoryId === parseInt(categoryName, 10) && (
                    <div className="MediaCategory__indicator" />
                  )}
                <div className="MediaCategory__name">
                  {category.CategoryName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};
