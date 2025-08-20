/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { CellType, Orientation } from "@xala/common";
import React from "react";

import {
  GridComponent,
  ListComponentHighlight,
  ListComponentHorizontal,
  ListComponentPromo,
} from "./components";
import { ListComponentLandscape } from "./components/ListComponentLandscape";
import { IListComponentProps } from "./types";

export const ListComponent: React.FC<IListComponentProps> = React.memo(
  ({
    readOnly = false,
    ready = true,
    component,
    loading,
    className,
    gridColumns,
    gridRows,
  }) => {
    switch (component.Orientation) {
      case Orientation.Grid:
        return (
          <GridComponent
            component={component}
            loading={loading}
            readOnly={readOnly}
            className={className}
            columns={gridColumns}
            rows={gridRows}
          />
        );
    }

    switch (component.CellType) {
      case CellType.Highlights:
        return (
          <ListComponentHighlight
            component={component}
            loading={loading}
            ready={ready}
            readOnly={readOnly}
            className={className}
          />
        );
      case CellType.Promo:
        return (
          <ListComponentPromo
            component={component}
            loading={loading}
            ready={ready}
            readOnly={readOnly}
            className={className}
          />
        );
      case CellType.Landscape:
        return (
          <ListComponentLandscape
            component={component}
            loading={loading}
            ready={ready}
            readOnly={readOnly}
            className={className}
          />
        );
      default:
        return (
          <ListComponentHorizontal
            component={component}
            loading={loading}
            ready={ready}
            readOnly={readOnly}
            className={className}
          />
        );
    }
  }
);
