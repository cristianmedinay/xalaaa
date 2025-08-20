/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import {
  ActionType,
  CellType,
  ConfigurationHelper,
  IBannerComponentItemModel,
  IBannerComponentModel,
  RouteHelper,
} from "@xala/common";
import React from "react";

import { ImageWithPlaceholder } from "components/ImageWithPlaceholder";

import resources from "../../../resources/list";

import "./BannerComponent.scss";

export interface IBannerComponentProps {
  component: IBannerComponentModel;
}

interface BannerComponentItemProps {
  item: IBannerComponentItemModel;
}

export const BannerComponentItem = ({ item }: BannerComponentItemProps) => {
  const onItemPress = (item: IBannerComponentItemModel) => {
    switch (item.Action?.ActionType) {
      case ActionType.OpenScreen:
        const screenKey =
          ConfigurationHelper.getApplicationMenuItemScreenKey(item);
        if (!!item.Action?.ScreenName && screenKey !== "custom") {
          RouteHelper.goTo(screenKey);
        }
        break;
      case ActionType.OpenUrl:
        if (item.Action.Url) {
          const url = item.Action.Url.startsWith("http")
            ? item.Action.Url
            : `https://${item.Action.Url}`;
          window.open(url, "__blank");
        }
        break;
    }
  };

  return (
    <div className="Banner_component__item" onClick={() => onItemPress(item)}>
      <div className="Banner_component_image-wrapper">
        <div className="Banner_component_image-container">
          <ImageWithPlaceholder
            imageSrc={item.ImageLink}
            imageContainerClassName="Banner_component__image"
            placeholderSrc={resources.coverPlaceholder}
            cellType={CellType.Banner}
            alt={item.Name}
          />
        </div>
      </div>
    </div>
  );
};

export const BannerComponent = ({ component }: IBannerComponentProps) => {
  return (
    <div className="Banner_container">
      {component.Items.map((item: IBannerComponentItemModel) => (
        <BannerComponentItem key={item.Id} item={item} />
      ))}
    </div>
  );
};
