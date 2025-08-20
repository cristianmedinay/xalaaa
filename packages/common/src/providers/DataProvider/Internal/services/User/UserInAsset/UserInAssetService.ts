/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { HTTP_METHOD } from "../../../../../../constants";
import {
  IInviteManyUsersModel,
  IRemoveManyUsersModel,
  IUserInAssetModel,
  IUserInAssetRoleModel,
} from "../../../../../../models";
import { AxiosSubscriber, SimpleServiceBase } from "../../../../../../services";
import {
  IUsersInAssetListModel,
  IUsersSearchFilterModel,
} from "../../../models";

export class UserInAssetService extends SimpleServiceBase<
  IUserInAssetModel,
  IUsersInAssetListModel,
  number,
  IUsersSearchFilterModel
> {
  public get url(): string {
    return "/UsersInAsset";
  }

  public getUserInAssetRoles = (): Observable<IUserInAssetRoleModel[]> =>
    new Observable(
      (observer: Observer<IUserInAssetRoleModel[]>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `/UserInAssetRoles/Select`,
        })
    );

  public inviteManyUsers = (users: IInviteManyUsersModel): Observable<void> =>
    new Observable(
      (observer: Observer<void>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.POST,
          data: users,
          url: `${this.url}/InviteMany`,
        })
    );

  public removeUser = (
    user: IUserInAssetModel & { AssetId: number }
  ): Observable<void> =>
    new Observable(
      (observer: Observer<void>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.POST,
          data: user,
          url: `${this.url}/Remove`,
        })
    );

  public removeManyUsers = (users: IRemoveManyUsersModel): Observable<void> =>
    new Observable(
      (observer: Observer<void>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.POST,
          data: users,
          url: `${this.url}/RemoveMany`,
        })
    );
}
