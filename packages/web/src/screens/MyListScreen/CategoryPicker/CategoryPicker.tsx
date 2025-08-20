/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import loadable from "@loadable/component";
import {
  IAppState,
  IMediaListStateModel,
  ROUTES,
  UrlHelper,
} from "@xala/common";
import cx from "classnames";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { Breakpoints } from "components";
import { ListComponentArrow } from "components/Configuration/ListComponent/components/ListComponentArrow";

import "./CategoryPicker.scss";

const Slider = loadable(() => import("react-slick"));

const SEE_ALL_ID = 0;

interface Props {
  listId: number | null;
}

export const CategoryPicker = ({ listId }: Props) => {
  const { t } = useTranslation();
  const [selectCategoryIndex, setSelectCategoryIndex] = useState(SEE_ALL_ID);
  const history = useHistory();

  const mediaList = useSelector<IAppState, IMediaListStateModel | undefined>(
    (state) => state.media.mediaList
  );

  const categoriesToShow = useMemo(() => {
    return listId &&
      mediaList &&
      mediaList[listId] &&
      mediaList[listId].AllPagesCategories &&
      mediaList[listId].AllPagesCategories!.length > 0
      ? [
          {
            CategoryId: SEE_ALL_ID,
            CategoryCode: t("LIST__SEE_ALL"),
            CategoryName: t("LIST__SEE_ALL"),
          },
          ...mediaList[listId].AllPagesCategories!,
        ]
      : [];
  }, [listId, mediaList, t]);

  const handleSelectCategory = (categoryIndex: number, activeIndex: number) => {
    const query = UrlHelper.parse(location.search);
    setSelectCategoryIndex(activeIndex);
    history.replace({
      pathname: ROUTES.MY_LIST_SCREEN,
      search: UrlHelper.joinQueries({ ...query, category: categoryIndex }),
    });
  };

  const isItemSelected = (index: number) => selectCategoryIndex === index;

  return (
    <div className="CategoryPicker">
      <Slider
        variableWidth
        slidesToShow={4}
        slidesToScroll={4}
        infinite={false}
        speed={500}
        nextArrow={
          <ListComponentArrow
            direction="right"
            containerStyle={{
              background:
                "linear-gradient(90.15deg, rgba(42, 47, 54, 0) 0.15%, var(--bg-color) 81.18%)",
              width: "10%",
              justifyContent: "flex-end",
            }}
          />
        }
        prevArrow={
          <ListComponentArrow
            direction="left"
            containerStyle={{
              width: "10%",
              justifyContent: "flex-start",
              marginLeft: "-30px",
            }}
          />
        }
        responsive={[
          {
            breakpoint: Breakpoints.XL,
            settings: {
              slidesToScroll: 3,
              slidesToShow: 3,
            },
          },
          {
            breakpoint: Breakpoints.LG,
            settings: {
              slidesToScroll: 2,
              slidesToShow: 2,
            },
          },
          {
            breakpoint: Breakpoints.SM,
            settings: {
              slidesToScroll: 1,
              slidesToShow: 1,
            },
          },
        ]}
      >
        {categoriesToShow.map((category, index) => (
          <div
            key={category.CategoryId}
            className={cx(
              "CategoryPicker__item",
              isItemSelected(index) && "CategoryPicker__item--selected"
            )}
            onClick={() => handleSelectCategory(category.CategoryId, index)}
          >
            {category.CategoryName.toLocaleLowerCase()}
          </div>
        ))}
      </Slider>
    </div>
  );
};
