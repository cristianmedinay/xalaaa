/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { HTTP_METHOD } from "../../../../../constants";
import {
  IAssetInAssetModel,
  IAssetInAssetSearchResponseModel,
  IAssetsInAssetSearchFilterModel,
} from "../../../../../models";
import { AxiosSubscriber, SimpleServiceBase } from "../../../../../services";
import {
  IAssetInAssetListModel,
  IAssetInAssetSearchFilterModel,
} from "../../models";

export class AssetInAssetService extends SimpleServiceBase<
  IAssetInAssetModel,
  IAssetInAssetListModel,
  number,
  IAssetInAssetSearchFilterModel
> {
  get url(): string {
    return "/AssetsInAssets";
  }

  public insertCollection = (
    data: IAssetInAssetModel[]
  ): Observable<IAssetInAssetModel[]> =>
    new Observable(
      (observer: Observer<IAssetInAssetModel[]>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/InsertCollection`,
        })
    );

  public saveCollection = (
    data: IAssetInAssetModel[]
  ): Observable<IAssetInAssetModel[]> =>
    new Observable(
      (observer: Observer<IAssetInAssetModel[]>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.PUT,
          url: `${this.url}/SaveCollection`,
        })
    );

  public searchAssetsInAssets = (
    data?: IAssetsInAssetSearchFilterModel
  ): Observable<IAssetInAssetSearchResponseModel> =>
    new Observable(
      (observer: Observer<IAssetInAssetSearchResponseModel>) =>
        new AxiosSubscriber(observer, {
          data: data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/Search`,
        })
    );
}
