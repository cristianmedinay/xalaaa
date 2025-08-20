/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { HTTP_METHOD } from "../../../../constants";
import {
  IPaymentListModel,
  IPaymentModel,
  IPaymentOptionsModel,
  IPaymentSearchFilterModel,
  IPaymentStatusModel,
  IPaymentTypeMappingAndOptionsModel,
} from "../../../../models";
import { AxiosSubscriber, PromisifiableBase } from "../../../../services";

export class PaymentsService extends PromisifiableBase {
  get url(): string {
    return "/Payments";
  }

  public get = (id: number): Observable<IPaymentModel> =>
    new Observable(
      (observer: Observer<IPaymentModel>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {
              id,
            },
          },
          method: HTTP_METHOD.GET,
          url: `${this.url}/Get`,
        })
    );

  public getByKey = (key: string): Observable<IPaymentModel> =>
    new Observable(
      (observer: Observer<IPaymentModel>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {
              key,
            },
          },
          method: HTTP_METHOD.GET,
          url: `${this.url}/GetByKey`,
        })
    );

  public checkStatusByKey = (key: string): Observable<IPaymentStatusModel> =>
    new Observable(
      (observer: Observer<IPaymentStatusModel>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {
              key,
            },
          },
          method: HTTP_METHOD.GET,
          url: `${this.url}/CheckStatusByKey`,
        })
    );

  public search = (
    filter: IPaymentSearchFilterModel
  ): Observable<IPaymentListModel> =>
    new Observable(
      (observer: Observer<IPaymentListModel>) =>
        new AxiosSubscriber(observer, {
          data: filter,
          method: HTTP_METHOD.POST,
          url: `${this.url}/Search`,
        })
    );

  public options = (): Observable<IPaymentOptionsModel> =>
    new Observable(
      (observer: Observer<IPaymentOptionsModel>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `${this.url}/GetOptions`,
        })
    );

  public paymentTypeMappingAndOptions =
    (): Observable<IPaymentTypeMappingAndOptionsModel> =>
      new Observable(
        (observer: Observer<IPaymentTypeMappingAndOptionsModel>) =>
          new AxiosSubscriber(observer, {
            method: HTTP_METHOD.GET,
            url: `${this.url}/GetPaymentTypeMappingAndOptions`,
          })
      );
}
