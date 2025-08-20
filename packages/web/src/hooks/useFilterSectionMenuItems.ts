/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ActionType, ISectionMenuItemModel, ScreenType } from "@xala/common";
import { useMemo } from "react";

export const useFilterSectionMenuItems = (items?: ISectionMenuItemModel[]) =>
  useMemo(
    () =>
      items?.filter((el) => {
        if (el.Action && el.Title) {
          if (el.Action?.ActionType === ActionType.OpenUrl) {
            return el.Action?.Url;
          } else if (
            el.Action?.ActionType === ActionType.OpenScreen &&
            el.Action.ScreenTypeCode === ScreenType.Custom
          ) {
            return el.Action.ScreenId;
          } else if (el.Action?.ActionType === ActionType.OpenScreen) {
            return el.Action.ScreenTypeCode;
          }
        }
      }),
    [items]
  );
