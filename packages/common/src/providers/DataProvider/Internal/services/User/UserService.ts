/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { HTTP_METHOD } from "../../../../../constants";
import {
  IChangePasswordModel,
  IResetPasswordModel,
  ISearchFilterModelBase,
  IUserModel,
  IUserProductModel,
  IUserRequestOptionsModel,
} from "../../../../../models";
import { AxiosSubscriber, SimpleServiceBase } from "../../../../../services";
import {
  ICreatorsListModel,
  IResendConfirmationByUserModel,
  IResendConfirmationModel,
  IUserBrandingModel,
  IUserBrandingSettingsModel,
  IUserDeleteAccountRequestModel,
  IUsersListModel,
  IUsersSearchFilterModel,
} from "../../models";

export class UserService extends SimpleServiceBase<
  IUserModel,
  IUsersListModel,
  number,
  IUsersSearchFilterModel
> {
  public get url(): string {
    return "/Users";
  }

  public getDetails = (
    id: number,
    options: IUserRequestOptionsModel = {}
  ): Observable<IUserModel> =>
    new Observable(
      (observer: Observer<IUserModel>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {
              id,
            },
          },
          data: options,
          method: HTTP_METHOD.POST,
          url: `${this.url}/Get`,
        })
    );

  public getProfile = (
    options: IUserRequestOptionsModel = {}
  ): Observable<IUserModel> =>
    new Observable(
      (observer: Observer<IUserModel>) =>
        new AxiosSubscriber(observer, {
          data: options,
          method: HTTP_METHOD.POST,
          url: `${this.url}/GetProfile`,
        })
    );

  public getProfileDetails = (
    options: IUserRequestOptionsModel = {}
  ): Observable<IUserModel> =>
    new Observable(
      (observer: Observer<IUserModel>) =>
        new AxiosSubscriber(observer, {
          data: options,
          method: HTTP_METHOD.POST,
          url: `${this.url}/GetProfile`,
        })
    );

  public getPublicProfile = (userId: number): Observable<IUserModel> =>
    new Observable(
      (observer: Observer<IUserModel>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {
              userId,
            },
          },
          method: HTTP_METHOD.GET,
          url: `${this.url}/GetPublicProfile`,
        })
    );

  public updateProfile = (data: IUserModel): Observable<IUserModel> =>
    new Observable(
      (observer: Observer<IUserModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.PUT,
          url: `${this.url}/UpdateProfile`,
        })
    );

  public deleteAccount = (
    data: IUserDeleteAccountRequestModel
  ): Observable<void> =>
    new Observable(
      (observer: Observer<void>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.PUT,
          url: `${this.url}/DeleteAccount`,
        })
    );

  public changePassword = (data: IChangePasswordModel): Observable<boolean> =>
    new Observable(
      (observer: Observer<boolean>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/ChangePassword`,
        })
    );

  public getBrandingSettings = (): Observable<IUserBrandingSettingsModel> =>
    new Observable(
      (observer: Observer<IUserBrandingSettingsModel>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `/UserBranding/GetBrandingSettings`,
        })
    );

  public saveBranding = (
    data: IUserBrandingModel
  ): Observable<IUserBrandingModel> =>
    new Observable(
      (observer: Observer<IUserBrandingModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.PUT,
          url: `/UserBranding/Save`,
        })
    );

  public getFamilyMembers = (): Observable<IUserModel[]> =>
    new Observable(
      (observer: Observer<IUserModel[]>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `/UserChildren/Select`,
        })
    );

  public addFamilyMember = (data: any): Observable<IUserModel> =>
    new Observable(
      (observer: Observer<IUserModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `/Authorization/RegisterChild`,
        })
    );

  public resetPassword = (data: IResetPasswordModel): Observable<boolean> =>
    new Observable(
      (observer: Observer<boolean>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/ResetPassword`,
        })
    );

  public browseCreators = (
    filter: ISearchFilterModelBase
  ): Observable<ICreatorsListModel> =>
    new Observable(
      (observer: Observer<ICreatorsListModel>) =>
        new AxiosSubscriber(observer, {
          data: filter,
          method: HTTP_METHOD.POST,
          url: `${this.url}/BrowseCreators`,
        })
    );

  public browseUsers = (
    filter: ISearchFilterModelBase
  ): Observable<IUsersListModel> =>
    new Observable(
      (observer: Observer<IUsersListModel>) =>
        new AxiosSubscriber(observer, {
          data: filter,
          method: HTTP_METHOD.POST,
          url: `${this.url}/Browse`,
        })
    );

  public resendConfirmationEmails = (
    data: IResendConfirmationModel
  ): Observable<void> =>
    new Observable(
      (observer: Observer<void>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/ResendConfirmationEmails`,
        })
    );

  public resendConfirmationEmailByUser = (
    data: IResendConfirmationByUserModel
  ): Observable<void> =>
    new Observable(
      (observer: Observer<void>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: data,
          },
          method: HTTP_METHOD.POST,
          url: `${this.url}/ResendConfirmationEmailByUser`,
        })
    );

  public confirmEmailByAdmin = (id: number): Observable<boolean> =>
    new Observable(
      (observer: Observer<boolean>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `${this.url}/ConfirmEmailByAdmin/${id}`,
        })
    );

  public getProducts = (): Observable<IUserProductModel[]> =>
    new Observable(
      (observer: Observer<IUserProductModel[]>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `${this.url}/GetProducts`,
        })
    );
}
