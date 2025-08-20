/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import axios, { AxiosResponse } from "axios";

import {
  AuthorizationHelper,
  DeviceHelper,
  StorageHelper,
} from "../../helpers";
import { IAuthRequestModel, IErrorModel, ITokenModel } from "../../models";
import { AuthService } from "../Auth";
import { StorageManager } from "../StorageManager";

let isAlreadyFetchingAccessToken = false;
const authService: AuthService = new AuthService();
let subscribers: Array<(token: string) => void> = [];

function onAccessTokenFetched(token: string) {
  subscribers.forEach((callback: (token: string) => void) => callback(token));
  subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback);
}

const signInAnonymous = async (
  data: IAuthRequestModel = {}
): Promise<ITokenModel> => {
  console.debug("Sigin anonymous");
  const response = await authService.signIn(data).toPromise();
  await StorageHelper.setUser(response.User);
  await StorageManager.setValue("session", response.AuthorizationToken);
  return response.AuthorizationToken as ITokenModel;
};

const refreshToken = async (token: string): Promise<ITokenModel> => {
  console.debug("Refresh token");
  const response = await authService.refreshToken(token).toPromise();
  await StorageManager.setValue("session", response.AuthorizationToken);
  return response.AuthorizationToken as ITokenModel;
};

export const RefreshTokenFulfilledInterceptor = (
  response: AxiosResponse
): AxiosResponse => response;

export const RefreshTokenRejectedInterceptor = async (
  error: IErrorModel | any
): Promise<any> => {
  const {
    config,
    response: { status },
  } = error;
  const originalRequest = config;

  if (status === 401) {
    console.debug("Unauthorized - status code 401");
    if (!isAlreadyFetchingAccessToken) {
      console.debug("Start refreshing token");
      isAlreadyFetchingAccessToken = true;
      try {
        let session = (await StorageManager.getValue("session")) as ITokenModel;
        const isAnonymous = await AuthorizationHelper.isAnonymous();
        const needsRefresh = AuthorizationHelper.hasTokenExpired(session);

        const onRefreshSuccess = (response: ITokenModel) => {
          console.debug("Token refreshed");
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(response.Token!);
        };

        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber((token: string) => {
            console.debug("Retry request");
            originalRequest.headers.Authorization = "Bearer " + token;
            resolve(axios(originalRequest));
          });
        });

        if (!session || (isAnonymous && needsRefresh)) {
          const deviceInfo = await DeviceHelper.getDeviceInfo();
          session = await signInAnonymous({ Device: deviceInfo });
          onRefreshSuccess(session);
        } else if (needsRefresh) {
          session = await refreshToken(session.RefreshToken as string);
          onRefreshSuccess(session);
        } else {
          isAlreadyFetchingAccessToken = false;
        }
        return retryOriginalRequest;
      } catch (error) {
        isAlreadyFetchingAccessToken = false;
        console.error(error);
      }
    }
  }
  return Promise.reject(error);
};
