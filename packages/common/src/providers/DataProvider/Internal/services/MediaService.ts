/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";

import { HTTP_METHOD } from "../../../../constants";
import {
  IMediaCategoryListModel,
  IMediaCategoryModel,
  IMediaChannelsForUserModel,
  IMediaListModel,
  IMediaListOptionsModel,
  IMediaModel,
  IMediaOptionsModel,
  IMediaPaymentRequestModel,
  IMediaPaymentResponseModel,
  IMediaPlayInfoModel,
  IMediaPlayInfoOptionsModel,
  IMediaPurchaseOfferModel,
  IMediaSearchFilterModel,
  IMediaSearchMediaInMediaFilterModel,
} from "../../../../models";
import { IMediaChannelProgramOptionsModel } from "../../../../models/Media/IMediaChannelProgramOptionsModel";
import { AxiosSubscriber, PromisifiableBase } from "../../../../services";

export class MediaService extends PromisifiableBase {
  get url(): string {
    return "/Media";
  }

  public getMedia = (options: IMediaOptionsModel): Observable<IMediaModel> =>
    new Observable(
      (observer: Observer<IMediaModel>) =>
        new AxiosSubscriber(observer, {
          data: options,
          method: HTTP_METHOD.POST,
          url: `${this.url}/GetMedia`,
        })
    );

  public getMediaPlayInfo = (
    options: IMediaPlayInfoOptionsModel
  ): Observable<IMediaPlayInfoModel> =>
    new Observable(
      (observer: Observer<IMediaPlayInfoModel>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.POST,
          url: `${this.url}/GetMediaPlayInfo`,
          data: options,
        })
    );

  public searchMedia = (
    filter: IMediaSearchFilterModel
  ): Observable<IMediaListModel> =>
    new Observable(
      (observer: Observer<IMediaListModel>) =>
        new AxiosSubscriber(observer, {
          data: filter,
          method: HTTP_METHOD.POST,
          url: `${this.url}/SearchMedia`,
        })
    );

  public searchMediaInMedia = (
    filter: IMediaSearchMediaInMediaFilterModel
  ): Observable<IMediaListModel> =>
    new Observable(
      (observer: Observer<IMediaListModel>) =>
        new AxiosSubscriber(observer, {
          data: filter,
          method: HTTP_METHOD.POST,
          url: `${this.url}/SearchMediaInMedia`,
        })
    );

  public getMediaList = (
    options: IMediaListOptionsModel
  ): Observable<IMediaListModel> =>
    new Observable(
      (observer: Observer<IMediaListModel>) =>
        new AxiosSubscriber(observer, {
          data: options,
          method: HTTP_METHOD.POST,
          url: `${this.url}/GetMediaList`,
        })
    ).pipe(
      map((data: IMediaListModel) => {
        data.Entities.map((media) => (media.RecoData = data.RecoData));
        return data;
      })
    );

  public selectMediaPurchaseOffers = (
    mediaId: number
  ): Observable<IMediaPurchaseOfferModel[]> =>
    new Observable(
      (observer: Observer<IMediaPurchaseOfferModel[]>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {
              mediaId,
            },
          },
          method: HTTP_METHOD.GET,
          url: `${this.url}/SelectMediaPurchaseOffers`,
        })
    );

  public getMediaChannelsForUser = (
    onGoingNow: boolean
  ): Observable<Partial<IMediaChannelsForUserModel>[]> =>
    new Observable(
      (observer: Observer<Partial<IMediaChannelsForUserModel>[]>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {
              ongoingNow: onGoingNow,
            },
          },
          method: HTTP_METHOD.GET,
          url: `${this.url}/GetChannelsForUser`,
        })
    );

  public getMediaChannelsForTown = (
    townId: number,
    onGoingNow: boolean
  ): Observable<Partial<IMediaChannelsForUserModel>[]> =>
    new Observable(
      (observer: Observer<Partial<IMediaChannelsForUserModel>[]>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {
              townId: townId,
              ongoingNow: onGoingNow,
            },
          },
          method: HTTP_METHOD.GET,
          url: `${this.url}/GetChannelsForTown`,
        })
    );

  public getMediaChannelPrograms = (
    options: IMediaChannelProgramOptionsModel
  ): Observable<IMediaListModel> =>
    new Observable(
      (observer: Observer<IMediaListModel>) =>
        new AxiosSubscriber(observer, {
          data: options,
          method: HTTP_METHOD.POST,
          url: `${this.url}/GetEPGChannel`,
        })
    );

  public getMediaCategories = (): Observable<IMediaCategoryListModel> =>
    new Observable(
      (observer: Observer<IMediaCategoryModel[]>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `${this.url}/GetMediaCategories`,
        })
    ).pipe(
      map((data: IMediaCategoryModel[]) => {
        const entities = data || [];

        const result: IMediaCategoryListModel = {
          Entities: entities,
          TotalCount: entities.length,
        };

        return result;
      })
    );

  public buy = (
    data: IMediaPaymentRequestModel
  ): Observable<IMediaPaymentResponseModel> =>
    new Observable(
      (observer: Observer<IMediaPaymentResponseModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/Buy`,
        })
    );
}
