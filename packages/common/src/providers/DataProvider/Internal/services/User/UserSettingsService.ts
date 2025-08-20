/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { HTTP_METHOD } from "../../../../../constants";
import { IUserModel, IUserSettingsModel } from "../../../../../models";
import { AxiosSubscriber, SimpleServiceBase } from "../../../../../services";
import { IUsersListModel, IUsersSearchFilterModel } from "../../models";

export class UserSettingsService extends SimpleServiceBase<
  IUserModel,
  IUsersListModel,
  number,
  IUsersSearchFilterModel
> {
  public get url(): string {
    return "/UserSettings";
  }

  public getUserSettings = (): Observable<IUserSettingsModel> =>
    new Observable(
      (observer: Observer<IUserSettingsModel>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `${this.url}/Get`,
        })
    );

  public updateUserSettings = (
    data: IUserSettingsModel
  ): Observable<IUserSettingsModel> =>
    new Observable(
      (observer: Observer<IUserSettingsModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.PUT,
          url: `${this.url}/Update`,
        })
    );
}
