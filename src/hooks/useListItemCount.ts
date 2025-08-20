/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { CellType, IListComponentModel } from "@xala/common";
import { useMemo } from "react";

import { useBreakpoints } from "../components";

const FRAME_ITEM_COUNT = 4;
const COVER_ITEM_COUNT = 6;
const HIGHLIGHTS_ITEM_COUNT = 1;
const LANDSCAPE_ITEM_COUNT = 1;
const ITEM_COUNT = 1;

export type ItemCountModel = {
  [key in CellType]: {
    [breakpoint: string]: number;
  };
};

// @ts-ignore
const listCountByType: ItemCountModel = {
  [CellType.Custom]: {
    XS: 1,
    SM: 2,
    MD: 3,
    LG: 3,
    XL: 3,
  },
  [CellType.Frame]: {
    XS: 1,
    SM: 2,
    MD: 3,
  },
  [CellType.Event]: {
    XS: 1,
    SM: 2,
    MD: 3,
  },
  [CellType.Cover]: {
    XS: 2,
    SM: 3,
    MD: 4,
  },
  [CellType.Round]: {
    XS: 2,
    SM: 3,
    MD: 4,
  },
  [CellType.Highlights]: {
    XS: 1,
    SM: 1,
    MD: 1,
    LG: 1,
    XL: 1,
  },
  [CellType.Default]: {
    XS: 1,
    SM: 2,
    MD: 3,
  },
  [CellType.Button]: {
    XS: 1,
    SM: 2,
    MD: 3,
  },
  [CellType.Square]: {
    XS: 1,
    SM: 2,
    MD: 3,
  },
  [CellType.Landscape]: {
    XS: 1,
    SM: 1,
    MD: 1,
  },
  [CellType.Channel]: {
    XS: 1,
    SM: 2,
    MD: 3,
    LG: 4,
  },
  [CellType.Promo]: {
    XS: 1,
    SM: 1,
    MD: 2,
  },
  [CellType.Podcast]: {
    XS: 1,
    SM: 2,
    MD: 3,
    LG: 3,
    XL: 4,
  },
};

export const getListItemCount = (
  component: IListComponentModel,
  breakpoint?: string
) => {
  const countByType = listCountByType[component.CellType || CellType.Frame];
  const countByResolution =
    countByType && breakpoint && countByType[breakpoint];
  if (!countByResolution) {
    switch (component.CellType) {
      case CellType.Frame:
        return component.VisibleItemsCount || FRAME_ITEM_COUNT;
      case CellType.Cover:
        return component.VisibleItemsCount || COVER_ITEM_COUNT;
      case CellType.Highlights:
      case CellType.Promo:
        return component.VisibleItemsCount || HIGHLIGHTS_ITEM_COUNT;
      case CellType.Landscape:
        return LANDSCAPE_ITEM_COUNT;
      default:
        return component.VisibleItemsCount || ITEM_COUNT;
    }
  }

  return countByResolution;
};

export const useListItemCount = (component: IListComponentModel) => {
  const { breakpoint } = useBreakpoints();
  const itemCount = useMemo(
    () => getListItemCount(component, breakpoint),
    [component, breakpoint]
  );

  return itemCount;
};
