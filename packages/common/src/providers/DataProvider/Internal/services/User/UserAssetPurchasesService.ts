/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { HTTP_METHOD } from "../../../../../constants";
import {
  IMediaPaymentResponseModel,
  IUserAssetPurchasesListModel,
  IUserAssetPurchasesSearchFilterModel,
  IUserPurchasesAggregatedModel,
} from "../../../../../models";
import { AxiosSubscriber, PromisifiableBase } from "../../../../../services";

export class UserAssetPurchasesService extends PromisifiableBase {
  get url(): string {
    return "/UserAssetPurchases";
  }

  public search = (
    filter: IUserAssetPurchasesSearchFilterModel
  ): Observable<IUserAssetPurchasesListModel> =>
    new Observable(
      (observer: Observer<IUserAssetPurchasesListModel>) =>
        new AxiosSubscriber(observer, {
          data: filter,
          method: HTTP_METHOD.POST,
          url: `${this.url}/Search`,
        })
    );

  public cancelSubscription = (
    userSubscriptionId: number
  ): Observable<IUserAssetPurchasesListModel> =>
    new Observable(
      (observer: Observer<IUserAssetPurchasesListModel>) =>
        new AxiosSubscriber(observer, {
          data: {
            UserSubscriptionId: userSubscriptionId,
          },
          method: HTTP_METHOD.POST,
          url: `${this.url}/CancelSubscription`,
        })
    );

  public reactivateSubscription = (
    userSubscriptionId: number
  ): Observable<IUserAssetPurchasesListModel> =>
    new Observable(
      (observer: Observer<IUserAssetPurchasesListModel>) =>
        new AxiosSubscriber(observer, {
          data: {
            UserSubscriptionId: userSubscriptionId,
          },
          method: HTTP_METHOD.POST,
          url: `${this.url}/ReactivateSubscription`,
        })
    );

  public changeSubscriptionPaymentMethod = (
    userSubscriptionId: number
  ): Observable<IMediaPaymentResponseModel> =>
    new Observable(
      (observer: Observer<IMediaPaymentResponseModel>) =>
        new AxiosSubscriber(observer, {
          data: {
            UserSubscriptionId: userSubscriptionId,
          },
          method: HTTP_METHOD.POST,
          url: `${this.url}/ChangeSubscriptionPaymentMethod`,
        })
    );

  public getUserPurchasesAggregated =
    (): Observable<IUserPurchasesAggregatedModel> =>
      new Observable(
        (observer: Observer<IUserPurchasesAggregatedModel>) =>
          new AxiosSubscriber(observer, {
            method: HTTP_METHOD.GET,
            url: `${this.url}/GetUserPurchasesAggregated`,
          })
      );
}
