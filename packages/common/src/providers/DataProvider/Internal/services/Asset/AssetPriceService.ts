/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { HTTP_METHOD } from "../../../../../constants";
import { IAssetPriceModel } from "../../../../../models";
import { AxiosSubscriber, SimpleServiceBase } from "../../../../../services";
import {
  IAssetPriceListModel,
  IAssetPriceSearchFilterModel,
} from "../../models";

export class AssetPriceService extends SimpleServiceBase<
  IAssetPriceModel,
  IAssetPriceListModel,
  number,
  IAssetPriceSearchFilterModel
> {
  get url(): string {
    return "/AssetPrices";
  }

  public saveCollection = (
    data: IAssetPriceModel[]
  ): Observable<IAssetPriceModel[]> =>
    new Observable(
      (observer: Observer<IAssetPriceModel[]>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.PUT,
          url: `${this.url}/SaveCollection`,
        })
    );

  public insertCollection = (
    data: IAssetPriceModel[]
  ): Observable<IAssetPriceModel[]> =>
    new Observable(
      (observer: Observer<IAssetPriceModel[]>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/InsertCollection`,
        })
    );
}
