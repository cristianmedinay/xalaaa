/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { HTTP_METHOD } from "../../../../../constants";
import { IUserAssetPropertiesModel } from "../../../../../models";
import { AxiosSubscriber } from "../../../../../services";

export class UserMediaPropertiesService {
  get url(): string {
    return "/UserMediaProperties";
  }

  public get = (assetId: number): Observable<IUserAssetPropertiesModel> =>
    new Observable(
      (observer: Observer<IUserAssetPropertiesModel>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: { assetId },
          },
          method: HTTP_METHOD.GET,
          url: `${this.url}/Get`,
        })
    );

  public select = (): Observable<IUserAssetPropertiesModel[]> =>
    new Observable(
      (observer: Observer<IUserAssetPropertiesModel[]>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `${this.url}/Select`,
        })
    );

  public setProgress = (data: IUserAssetPropertiesModel): Observable<void> =>
    new Observable(
      (observer: Observer<void>) =>
        new AxiosSubscriber(observer, {
          data: data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/SetProgress`,
        })
    );

  public addToFavourites = (assetId: number): Observable<void> =>
    new Observable(
      (observer: Observer<void>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: { assetId },
          },
          method: HTTP_METHOD.PUT,
          url: `${this.url}/AddToFavourites`,
        })
    );

  public removeFromFavourites = (assetId: number): Observable<void> =>
    new Observable(
      (observer: Observer<void>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: { assetId },
          },
          method: HTTP_METHOD.PUT,
          url: `${this.url}/RemoveFromFavourites`,
        })
    );
}
