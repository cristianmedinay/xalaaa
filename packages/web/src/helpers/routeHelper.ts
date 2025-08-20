/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AssetType, dispatch, IAssetModel } from "@xala/common";
import { push, replace } from "connected-react-router";

import { ROUTES } from "../constants";

export class RouteHelper {
  static goToDetails(asset: IAssetModel, replaceRoute?: boolean): void {
    let path: string;
    switch (asset.AssetTypeCode) {
      case AssetType.Series:
        path = `${ROUTES.SERIES_DETAILS_SCREEN}/${asset.Id}`;
        break;
      default:
        path = `${ROUTES.MOVIE_DETAILS_SCREEN}/${asset.Id}`;
        break;
    }

    dispatch(replaceRoute ? replace(path) : push(path));
  }

  static goToPlayer(asset: IAssetModel, replaceRoute?: boolean): void {
    const path = `${ROUTES.PLAYER_SCREEN}/${asset.Id}`;
    dispatch(replaceRoute ? replace(path) : push(path));
  }
}
