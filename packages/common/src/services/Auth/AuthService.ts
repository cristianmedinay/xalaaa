/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { IAuthCodeRequestModel } from "models/Auth/IAuthCodeRequestModel";

import { HTTP_METHOD } from "../../constants";
import {
  IAuthRequestModel,
  IAuthResponseModel,
  IAuthVerifyLoginModel,
  IChangePasswordModel,
  ILoginCodeModel,
  IUserDeviceModel,
} from "../../models";
import { AxiosSubscriber } from "../Common";

export class AuthService {
  get url(): string {
    return "/Authorization";
  }
  public signIn = (data: IAuthRequestModel): Observable<IAuthResponseModel> =>
    new Observable((observer: Observer<IAuthResponseModel>) => {
      return new AxiosSubscriber(observer, {
        data,
        method: HTTP_METHOD.POST,
        url: `${this.url}/SignIn`,
      });
    });

  public signOut = (
    device?: IUserDeviceModel
  ): Observable<IAuthResponseModel> =>
    new Observable(
      (observer: Observer<IAuthResponseModel>) =>
        new AxiosSubscriber(observer, {
          data: device,
          method: HTTP_METHOD.POST,
          url: `${this.url}/SignOut`,
        })
    );

  public refreshToken = (
    refreshToken: string,
    device?: IUserDeviceModel
  ): Observable<IAuthResponseModel> =>
    new Observable(
      (observer: Observer<IAuthResponseModel>) =>
        new AxiosSubscriber(observer, {
          data: {
            Device: device,
            Token: refreshToken,
          },
          method: HTTP_METHOD.POST,
          url: `${this.url}/RefreshToken`,
        })
    );

  public changePassword = (
    data: IChangePasswordModel
  ): Observable<IAuthResponseModel> =>
    new Observable(
      (observer: Observer<IAuthResponseModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/ChangePassword`,
        })
    );
  //LOGIN CODE

  public getLoginCode = (): Observable<IAuthCodeRequestModel> =>
    new Observable((observer: Observer<IAuthCodeRequestModel>) => {
      return new AxiosSubscriber(observer, {
        method: HTTP_METHOD.POST,
        url: `${this.url}/GetLoginCode`,
      });
    });

  public verifyLogin = (
    data: IAuthVerifyLoginModel
  ): Observable<IAuthResponseModel> =>
    new Observable((observer: Observer<IAuthResponseModel>) => {
      return new AxiosSubscriber(observer, {
        data,
        method: HTTP_METHOD.POST,
        url: `${this.url}/VerifyLoginCode`,
      });
    });

  public linkLoginCode = (data: ILoginCodeModel): Observable<ILoginCodeModel> =>
    new Observable((observer: Observer<ILoginCodeModel>) => {
      return new AxiosSubscriber(observer, {
        data,
        method: HTTP_METHOD.POST,
        url: `${this.url}/LinkLoginCode`,
      });
    });
}
