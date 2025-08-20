/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  CellType,
  IMediaListModel,
  IMediaModel,
  ROUTES,
  SourceType,
  ThemeContext,
} from "@xala/common";
import * as React from "react";
import isEqual from "react-fast-compare";
import { WithTranslation } from "react-i18next";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { Action, ActionCreator } from "redux";

import { useGridtemCount } from "hooks";

import { ListComponentItem } from "..";
import Chevron from "../../../../../resources/chevron.png";
import { IListComponentProps } from "../../types";

import "./GridComponent.scss";

const GRID_COLS = 4;
const GRID_ROWS = 3;

export interface IGridComponentStateProps {
  source?: any;
}

export interface IGridComponentDispatchProps {
  getDataSourceCancel?: ActionCreator<Action>;
  getDataSource?: ActionCreator<Action>;
}

export interface IGridComponentOwnProps extends IListComponentProps {
  columns?: number;
  rows?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface IGridComponentProps
  extends IGridComponentStateProps,
    IGridComponentDispatchProps,
    IGridComponentOwnProps,
    WithTranslation {}

export const GridComponent = React.memo((props: IGridComponentProps) => {
  const columns = useGridtemCount();
  return <GridComponentClass {...props} columns={props.columns || columns} />;
});

export class GridComponentClass extends React.Component<IGridComponentProps> {
  static contextType = ThemeContext;

  public static defaultProps = {
    columns: GRID_COLS,
    rows: GRID_ROWS,
  };

  componentDidMount = () => {
    const { component, getDataSource } = this.props;

    if (component.SourceId && getDataSource) {
      getDataSource(component.SourceId);
    }
  };

  public shouldComponentUpdate(nextProps: IGridComponentProps) {
    return !isEqual(nextProps, this.props);
  }

  chunk = (array: IMediaModel[] | undefined, size = 1) => {
    if (!array) {
      return [];
    }

    const arrayChunks = [];
    for (let i = 0; i < array.length; i += size) {
      const arrayChunk = array.slice(i, i + size);
      arrayChunks.push(arrayChunk);
    }
    return arrayChunks;
  };

  private getSource = (): IMediaListModel | undefined => {
    const { component, source } = this.props;

    if (component.SourceId && source) {
      return source;
    } else if (component.MediaList) {
      return {
        SourceType: SourceType.MediaList,
        Entities: component.MediaList,
        TotalCount: component.MediaList.length,
        IsLoading: false,
      };
    }

    return undefined;
  };

  private renderItem = (media: IMediaModel) => {
    const { component, columns } = this.props;

    switch (component.CellType) {
      case CellType.Cover:
      case CellType.Highlights:
      case CellType.Frame:
      default:
        return (
          <ListComponentItem
            media={media}
            cellType={component.CellType}
            isPlaceholder={!!this.loading}
            readOnly={this.loading}
            style={{
              fontSize: `${
                this.context.themeProvider.getFontSize() *
                this.context.themeProvider.getListItemCountFactor(columns)
              }px`,
            }}
            isGrid
            showTimeLeft={component.ShowTimeLeft}
          />
        );
    }
  };

  get loading() {
    const { loading } = this.props;
    const source = this.getSource();

    return loading || source?.IsLoading;
  }

  renderHeader = () => {
    const { component, readOnly, t } = this.props;
    const source = this.getSource();
    const themeProvider = this.context.themeProvider;
    const skeletonColor = themeProvider.getColor("AppCellsBackgroundColor");
    const title = t(component.TitleTranslationKey || "", component.Title);

    const hasRedirectLink = !readOnly && component.SourceId;
    const hasItems = source?.Entities;

    if (title || component.SourceId) {
      return (
        <SkeletonTheme color={skeletonColor} highlightColor={skeletonColor}>
          <header className="GridComponent__title-container">
            <p className="GridComponent__title">
              {hasItems && !this.loading ? title : <Skeleton width="25rem" />}
            </p>

            {hasItems && !this.loading && hasRedirectLink ? (
              <Link
                className="GridComponent__see-all"
                to={`${ROUTES.PLAYLIST_SCREEN}/${component.SourceId}/${component.Title}`}
              >
                {t("LIST__SEE_ALL")}
                <img src={Chevron} alt="" /> {/* FIXME replace with svg icon */}
              </Link>
            ) : (
              hasRedirectLink && (
                <p className="GridComponent__title">
                  <Skeleton width="8rem" />
                </p>
              )
            )}
          </header>
        </SkeletonTheme>
      );
    }
  };

  render() {
    const { className, rows = GRID_ROWS, style } = this.props;
    let { columns = GRID_COLS } = this.props;
    const branding = this.context.themeProvider.getBranding();
    const cellPadding = branding.AppListItemPaddingHorizontal;
    const source = this.getSource();
    let entities = source?.Entities;

    if (window.innerWidth < 1400 && columns > 3) {
      columns = 3;
    }

    if (window.innerWidth < 800 && columns > 2) {
      columns = 2;
    }

    if (window.innerWidth < 500 && columns > 1) {
      columns = 1;
    }

    if (!entities?.length && this.loading) {
      entities = [...Array(columns * rows).keys()].map(() => ({ Id: -1 }));
    }

    let grid = this.chunk(entities, columns);

    if (rows) {
      grid = grid.slice(0, rows);
    }

    return (
      <div className={`GridComponent ${className}`} style={style}>
        {this.renderHeader()}
        {grid.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="row"
            style={{ margin: `0 -${cellPadding / 2}px ${cellPadding}px` }}
          >
            {row.map((column, columnIndex) => (
              <div
                key={`col-${columnIndex}`}
                className={`col col-${columnIndex}`}
                style={{
                  width: `${100 / columns}%`,
                }}
              >
                {this.renderItem(column)}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
