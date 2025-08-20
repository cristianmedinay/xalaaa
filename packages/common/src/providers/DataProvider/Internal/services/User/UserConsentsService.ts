/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { HTTP_METHOD } from "../../../../../constants";
import { IUserConsentModel } from "../../../../../models";
import { AxiosSubscriber } from "../../../../../services";

export class UserConsentsService {
  get url(): string {
    return "/UsersConsents";
  }

  public select = (): Observable<IUserConsentModel[]> =>
    new Observable(
      (observer: Observer<IUserConsentModel[]>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.POST,
          url: `${this.url}/Select`,
        })
    );

  public fetchConsent = (url: string): Observable<string> =>
    new Observable(
      (observer: Observer<string>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: url,
        })
    );

  public update = (data: IUserConsentModel): Observable<IUserConsentModel> =>
    new Observable(
      (observer: Observer<IUserConsentModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.PUT,
          url: `${this.url}/Update`,
        })
    );

  public updateCollection = (
    data: IUserConsentModel[]
  ): Observable<IUserConsentModel[]> =>
    new Observable(
      (observer: Observer<IUserConsentModel[]>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.PUT,
          url: `${this.url}/UpdateCollection`,
        })
    );
}
