/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { ISectionMenuItemModel } from "@xala/common";
import { useMemo } from "react";

export const useTransformValue = (
  filteredSectionMenuItems: ISectionMenuItemModel[] | undefined,
  itemsDimensionArray: {
    left: number;
    right: number;
    width: number;
  }[],
  innerWidth: number,
  MARGIN_LEFT: number,
  MARGIN_RIGHT: number
) => {
  const transformValue = useMemo(() => {
    let transformValueRight = 0;
    let transformValueLeft = 0;

    const filteredItemsDimensionArray = itemsDimensionArray.slice(
      -(filteredSectionMenuItems?.length || 0)
    );

    const lastItemRight =
      filteredItemsDimensionArray[filteredItemsDimensionArray.length - 1]
        ?.right || 0;

    const itemsToRightOfFocus = filteredItemsDimensionArray.filter((el) => {
      if (el.right > innerWidth && el.left > MARGIN_LEFT) {
        return el;
      }
    });

    const itemsToLeftOfFocus = filteredItemsDimensionArray.filter((el) => {
      if (el.left < MARGIN_LEFT) {
        return el;
      }
    });

    let rightElementWidth = 0;
    itemsToRightOfFocus.forEach((el) => {
      rightElementWidth += el.width;
    });

    if (
      rightElementWidth > innerWidth - MARGIN_LEFT &&
      itemsToRightOfFocus[0]?.left
    ) {
      if (
        itemsToRightOfFocus[0].left === MARGIN_LEFT &&
        itemsToRightOfFocus[1]?.left
      ) {
        transformValueRight = itemsToRightOfFocus[1]?.left - MARGIN_LEFT;
      } else {
        transformValueRight = itemsToRightOfFocus[0].left - MARGIN_LEFT;
      }
    }
    if (
      rightElementWidth <= innerWidth - MARGIN_LEFT &&
      itemsToRightOfFocus[itemsToRightOfFocus.length - 1]?.right
    ) {
      transformValueRight =
        itemsToRightOfFocus[itemsToRightOfFocus.length - 1].right -
        innerWidth +
        MARGIN_RIGHT;
    }

    let leftElementsWidth = 0;
    itemsToLeftOfFocus.forEach((el) => {
      leftElementsWidth += el.width;
    });

    if (
      leftElementsWidth > innerWidth - MARGIN_LEFT &&
      itemsToLeftOfFocus[itemsToLeftOfFocus.length - 1]?.left
    ) {
      transformValueLeft =
        -itemsToLeftOfFocus[itemsToLeftOfFocus.length - 1].left + MARGIN_LEFT;
    }
    if (
      leftElementsWidth <= innerWidth - MARGIN_LEFT &&
      itemsToLeftOfFocus[0]?.left
    ) {
      transformValueLeft = -itemsToLeftOfFocus[0].left + MARGIN_LEFT;
    }

    return { transformValueLeft, transformValueRight, lastItemRight };
  }, [
    itemsDimensionArray,
    innerWidth,
    filteredSectionMenuItems?.length,
    MARGIN_LEFT,
    MARGIN_RIGHT,
  ]);

  return transformValue;
};
