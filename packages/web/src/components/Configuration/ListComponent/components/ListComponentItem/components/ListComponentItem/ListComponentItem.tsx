/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { CellType } from "@xala/common";
import * as React from "react";

import { IListComponentItemProps } from "../../models";
import { ListComponentItemChannel } from "../ListComponentItemChannel";
import { ListComponentItemCover } from "../ListComponentItemCover";
import { ListComponentItemFrame } from "../ListComponentItemFrame";
import { ListComponentItemHighlight } from "../ListComponentItemHighlight";
import { ListComponentItemLandscape } from "../ListComponentItemLandscape";
import { ListComponentItemPodcast } from "../ListComponentItemPodcast";
import { ListComponentItemPromo } from "../ListComponentItemPromo";
import { ListComponentItemRound } from "../ListComponentItemRound";
import { ListComponentItemSquare } from "../ListComponentItemSquare";

import "./ListComponentItem.scss";

/**
 * Component to generate current cell in horizontal list. For example a film from category list
 * @exports ListComponentItem [default]
 */
export class ListComponentItem extends React.PureComponent<IListComponentItemProps> {
  public static defaultProps: IListComponentItemProps = {
    isPlaceholder: false,
    width: -1,
    isGrid: false,
  };

  private renderView = () => {
    const {
      media,
      isActive,
      isPlaceholder,
      width = -1,
      withProgress,
      index,
      readOnly,
      isGrid,
      showTimeLeft,
    } = this.props;

    const cellType = this.props.cellType;
    const itemKey = `list-item-${index}_${media ? media.Id : ""}`;

    switch (cellType) {
      case CellType.Cover:
        return (
          <ListComponentItemCover
            key={itemKey}
            media={media}
            index={index}
            isActive={isActive}
            isPlaceholder={isPlaceholder}
            width={width}
            readOnly={readOnly}
          />
        );
      case CellType.Round:
        return (
          <ListComponentItemRound
            key={itemKey}
            media={media}
            index={index}
            isActive={isActive}
            isPlaceholder={isPlaceholder}
            width={width}
            readOnly={readOnly}
          />
        );
      case CellType.Landscape:
        return (
          <ListComponentItemLandscape
            key={itemKey}
            media={media}
            index={index}
            isActive={isActive}
            isPlaceholder={isPlaceholder}
            width={width}
            readOnly={readOnly}
          />
        );
      case CellType.Highlights:
        return (
          <ListComponentItemHighlight
            key={itemKey}
            media={media}
            index={index}
            isActive={isActive}
            isPlaceholder={isPlaceholder}
            width={width}
            readOnly={readOnly}
          />
        );
      case CellType.Promo:
        return (
          <ListComponentItemPromo
            key={itemKey}
            media={media}
            index={index}
            isActive={isActive}
            isPlaceholder={isPlaceholder}
            width={width}
            readOnly={readOnly}
          />
        );
      case CellType.Square:
        return (
          <ListComponentItemSquare
            key={itemKey}
            media={media}
            index={index}
            isActive={isActive}
            isPlaceholder={isPlaceholder}
            width={width}
            readOnly={readOnly}
            withProgress={withProgress}
          />
        );
      case CellType.Channel:
        return (
          <ListComponentItemChannel
            key={itemKey}
            media={media}
            index={index}
            isActive={isActive}
            isPlaceholder={isPlaceholder}
            width={width}
            readOnly={readOnly}
            withProgress={withProgress}
          />
        );
      case CellType.Podcast:
        return (
          <ListComponentItemPodcast
            key={itemKey}
            media={media}
            index={index}
            isActive={isActive}
            isPlaceholder={isPlaceholder}
            width={width}
            readOnly={readOnly}
            withProgress={withProgress}
            cellType={cellType}
            isGrid={isGrid}
          />
        );
      case CellType.Custom:
        return (
          <ListComponentItemFrame
            key={itemKey}
            media={media}
            index={index}
            isActive={isActive}
            isPlaceholder={isPlaceholder}
            width={width}
            readOnly={readOnly}
            withProgress={withProgress}
            cellType={cellType}
          />
        );
      case CellType.Frame:
        return (
          <ListComponentItemFrame
            key={itemKey}
            media={media}
            index={index}
            isActive={isActive}
            isPlaceholder={isPlaceholder}
            width={width}
            readOnly={readOnly}
            withProgress={withProgress}
            cellType={cellType}
            showTimeLeft={!!media?.StartDateTime}
          />
        );
      case CellType.Event:
      default:
        return (
          <ListComponentItemFrame
            key={itemKey}
            media={media}
            index={index}
            isActive={isActive}
            isPlaceholder={isPlaceholder}
            width={width}
            readOnly={readOnly}
            withProgress={withProgress}
            cellType={cellType}
            showTimeLeft={showTimeLeft}
          />
        );
    }
  };

  render() {
    const className =
      this.props.isActive === true
        ? "ListComponentItem ListComponentItem--active"
        : "ListComponentItem";

    return (
      <div className={className} style={this.props.style}>
        {this.renderView()}
      </div>
    );
  }
}
