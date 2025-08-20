/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ActionType,
  ConfigurationHelper,
  ISectionMenuItemModel,
} from "@xala/common";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import "./SectionMenuListComponentItem.scss";

interface SectionMenuListComponentItemProps {
  item: ISectionMenuItemModel;
  setItemsDimensionArray: React.Dispatch<
    React.SetStateAction<{ left: number; right: number; width: number }[]>
  >;
  scrollValue: number;
  innerWidth: number;
}
export const SectionMenuListComponentItem = ({
  item,
  setItemsDimensionArray,
  scrollValue,
  innerWidth,
}: SectionMenuListComponentItemProps) => {
  const { t } = useTranslation();
  let button: JSX.Element | undefined;

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const {
      left = 0,
      right = 0,
      width = 0,
    } = buttonRef.current?.getBoundingClientRect() || {};

    setItemsDimensionArray((prev) => [...prev, { left, right, width }]);
  }, [setItemsDimensionArray, buttonRef, scrollValue, innerWidth]);

  switch (item.Action?.ActionType) {
    case ActionType.OpenScreen:
      const screenKey =
        ConfigurationHelper.getApplicationMenuItemScreenKey(item);
      button = (
        <Link to={`/${screenKey}`}>
          {
            <button ref={buttonRef} className="SectionMenuListComponentItem">
              {t(`${item.TitleTranslationKey}`)}
            </button>
          }
        </Link>
      );
      break;
    case ActionType.OpenUrl:
      button = (
        <a
          href={
            item.Action?.Url && item.Action?.Url.startsWith("http")
              ? item.Action?.Url
              : `https://${item.Action.Url}`
          }
          target="_blank"
          rel="noreferrer"
        >
          {
            <button ref={buttonRef} className="SectionMenuListComponentItem">
              {t(`${item.TitleTranslationKey}`)}
            </button>
          }
        </a>
      );
      break;
    default:
      button = (
        <button className="SectionMenuListComponentItem">
          {t(`${item.TitleTranslationKey}`)}
        </button>
      );
  }

  return button;
};
