/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ActionType,
  ConfigurationHelper,
  FooterAlignment,
  IApplicationFooterItemComponentModel,
  IApplicationFooterScreenModel,
  ScreenType,
  useConfigurationSelector,
} from "@xala/common";
import cx from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { LanguageSelector } from "components";
import BackgroundImage from "resources/footer-background.png"; //TODO mock image - should be fetch from cms

import "./AppFooter.scss";

const COLUMNS_COUNT = 7;

type FooterTable = {
  [rowIndex: number]: IApplicationFooterItemComponentModel[];
};

const splitIntoColumns = (
  footerItems: IApplicationFooterItemComponentModel[] = [],
  columnsCount: number
) => {
  const itemsTable: FooterTable = {};
  footerItems.forEach((item, index) => {
    const row = Math.floor(index / columnsCount);
    if (!itemsTable[row]) {
      itemsTable[row] = [];
    }
    itemsTable[row].push(item);
  });

  return itemsTable;
};

const RenderColumns = (itemModel: IApplicationFooterItemComponentModel) => {
  const { t } = useTranslation();
  const imgSrc = itemModel.IconUrl || itemModel.ImageLink;

  let item: string | JSX.Element | undefined = imgSrc ? (
    <img
      src={imgSrc}
      className="Icon"
      alt={t(itemModel.TitleTranslationKey || "", itemModel.Title)}
    />
  ) : (
    t(itemModel.TitleTranslationKey || "", itemModel.Title)
  );

  if (!item) {
    return;
  }

  switch (itemModel.Action?.ActionType) {
    case ActionType.OpenScreen:
      const screenKey =
        ConfigurationHelper.getApplicationMenuItemScreenKey(itemModel);
      item = <Link to={`/${screenKey}`}>{item}</Link>;
      break;
    case ActionType.OpenUrl:
      item = (
        <a href={itemModel.Action?.Url} target="_blank" rel="noreferrer">
          {item}
        </a>
      );
      break;
    case ActionType.CallTo:
      item = <a href={`tel:${itemModel.Action?.PhoneNo}`}>{item}</a>;
      break;
    case ActionType.EmailTo:
      item = <a href={`mailto:${itemModel.Action?.Email}`}>{item}</a>;
      break;
  }

  return <p key={itemModel.Id}>{item}</p>;
};

const renderRow = (
  rowIndex: string,
  items: IApplicationFooterItemComponentModel[],
  footerAlignment: string
) => {
  const renderedColumns = items.map(RenderColumns);

  const className = cx("Row", {
    Row__Justify: footerAlignment === FooterAlignment.Justify,
    Row__FitToContent: footerAlignment === FooterAlignment.FitToContent,
  });

  return (
    <div className={className} key={rowIndex}>
      {renderedColumns}
    </div>
  );
};

const renderFooterColumns = (
  footerTable: FooterTable,
  footerAlignment: string
) => {
  const rows = [];
  for (const rowIndex in footerTable) {
    const row = renderRow(rowIndex, footerTable[rowIndex], footerAlignment);
    rows.push(row);
  }
  return rows;
};

export const AppFooter = () => {
  const configuration = useConfigurationSelector();

  const footerConfig = ConfigurationHelper.getScreenByType(
    configuration,
    ScreenType.ApplicationFooter
  ) as IApplicationFooterScreenModel;

  const footerBackground = footerConfig.BackgroundUrl || BackgroundImage;

  const footerTable = splitIntoColumns(
    footerConfig?.Components,
    footerConfig?.Columns || COLUMNS_COUNT
  );
  const footerRows = renderFooterColumns(
    footerTable,
    footerConfig.ItemsAlignment || FooterAlignment.Justify
  );

  return (
    <footer
      className="AppFooter"
      style={{
        backgroundImage: `url(${footerBackground})`,
      }}
    >
      <div className="AppFooter__Wrapper">
        <div className="AppFooter__Content">
          {footerRows}
          <div className="AppFooter__Content__LanguageSelector">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  );
};
