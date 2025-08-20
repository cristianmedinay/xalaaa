/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { HTTP_METHOD } from "../../../../constants";
import {
  IAuthResponseModel,
  IConfirmAccountWithPasswordModel,
  IForgotPasswordModel,
  IRegisterConfirmEmailModel,
  IRegisterRequestEmailModel,
  IResetForgotPasswordModel,
  IResetPasswordModel,
} from "../../../../models";
import { AxiosSubscriber } from "../../../../services";

export class RegisterService {
  get url(): string {
    return "/Registration";
  }

  public registerEmail = (
    data: IRegisterRequestEmailModel
  ): Observable<boolean> =>
    new Observable(
      (observer: Observer<boolean>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/RegisterEmail`,
        })
    );

  public registerConfirmEmail = (
    data: IRegisterConfirmEmailModel
  ): Observable<IAuthResponseModel> =>
    new Observable(
      (observer: Observer<IAuthResponseModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/RegisterConfirmEmail`,
        })
    );

  public registerConfirmAccountWithPassword = (
    data: IConfirmAccountWithPasswordModel
  ): Observable<IAuthResponseModel> =>
    new Observable(
      (observer: Observer<IAuthResponseModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/RegisterConfirmAccount`,
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

  public validateConfirmationToken = (token: string): Observable<undefined> =>
    new Observable(
      (observer: Observer<undefined>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {
              token,
            },
          },
          method: HTTP_METHOD.GET,
          url: `${this.url}/ValidateConfirmationToken`,
        })
    );

  public forgotPassword = (data: IForgotPasswordModel): Observable<boolean> =>
    new Observable(
      (observer: Observer<boolean>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/ForgotPassword`,
        })
    );

  public resetForgotPassword = (
    data: IResetForgotPasswordModel
  ): Observable<boolean> =>
    new Observable(
      (observer: Observer<boolean>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/ResetPassword`,
        })
    );
}
