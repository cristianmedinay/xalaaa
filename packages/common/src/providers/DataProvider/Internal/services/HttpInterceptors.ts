/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { push } from "connected-react-router";

import { HTTP_ERROR, ROUTES } from "../../../../constants";
import {
  AuthorizationHelper,
  DeviceHelper,
  StorageHelper,
} from "../../../../helpers";
import { IErrorModel, ITokenModel, IUserInfoModel } from "../../../../models";
import { AuthService, StorageManager } from "../../../../services";
import { AuthStore, dispatch } from "../../../../store";

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const authService: AuthService = new AuthService();

const processQueue = (error?: IErrorModel, token?: string) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

export const HttpRequestFulfilledInterceptor = (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  return StorageManager.getValue("session").then((session: ITokenModel) => {
    if (
      session &&
      session.Token &&
      !config.headers.hasOwnProperty("Authorization")
    ) {
      config.headers["Authorization"] = `Bearer ${session.Token}`;
    }

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json; charset=UTF-8";
    }

    return config;
  });
};

export const HttpRequestRejectedInterceptor = (error: IErrorModel): any => {
  return Promise.reject(error);
};

export const HttpResponseFulfilledInterceptor = (
  response: AxiosResponse
): AxiosResponse => response;

export const HttpResponseRejectedInterceptor = async (
  error: IErrorModel | any
): Promise<any> => {
  const { config, response } = error;
  const originalRequest = config;
  const deviceInfo = await DeviceHelper.getDeviceInfo();

  if (
    response?.status === HTTP_ERROR.AUTHENTICATION_FAILED &&
    response?.config?.url === "/Authorization/SignIn"
  ) {
    return Promise.reject(new Error(response?.data?.Message || "Unauthorized"));
  }

  if (
    (!response || response?.status === HTTP_ERROR.AUTHENTICATION_FAILED) &&
    !originalRequest._retry
  ) {
    // Check if refresh token request failed
    if (response?.config?.url === "/Authorization/RefreshToken") {
      isRefreshing = false;
      // Clear session data as it is invalid
      await StorageManager.deleteValue("session");
      await StorageManager.deleteValue("channels");
      // Remove user data from store
      dispatch(AuthStore.Actions.refreshTokenFailure());
      // Try to login as Anonymous
      const loginResponse = await authService
        .signIn({ Device: deviceInfo })
        .toPromise();

      if (loginResponse.AuthorizationToken) {
        await StorageHelper.setUser(loginResponse.User);
        await StorageManager.setValue(
          "session",
          loginResponse.AuthorizationToken
        );
        await StorageManager.setValue("backendVersion", loginResponse.Version);

        dispatch(push(ROUTES.LOGIN));

        processQueue(undefined, loginResponse.AuthorizationToken.Token);

        return Promise.reject(new Error("Unable to refresh token"));
      }

      dispatch(push(ROUTES.BASE));

      return Promise.reject(new Error("Unable to refresh token"));
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = "Bearer " + token;

          return axios(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const session = (await StorageManager.getValue("session")) as ITokenModel;

    try {
      const isAnonymous = await AuthorizationHelper.isAnonymous();
      let newSession: ITokenModel | undefined = undefined;
      const refreshToken = session?.RefreshToken;

      if (!refreshToken || isAnonymous) {
        // Try to login as Anonymous
        const loginResponse = await authService
          .signIn({ Device: deviceInfo })
          .toPromise();

        if (loginResponse.AuthorizationToken) {
          await StorageHelper.setUser(loginResponse.User);
          await StorageManager.setValue(
            "session",
            loginResponse.AuthorizationToken
          );
          await StorageManager.setValue(
            "backendVersion",
            loginResponse.Version
          );
          await StorageManager.deleteValue("channels");

          newSession = loginResponse.AuthorizationToken;
        }
      } else {
        // Try to refresh token
        const refreshTokenResponse = await authService
          .refreshToken(refreshToken, deviceInfo)
          .toPromise();

        if (refreshTokenResponse.AuthorizationToken) {
          await StorageManager.setValue(
            "session",
            refreshTokenResponse.AuthorizationToken
          );
          newSession = refreshTokenResponse.AuthorizationToken;

          const newUser = refreshTokenResponse.User as IUserInfoModel;

          // refresh user products if have changed since the last update
          if (newUser) {
            await StorageHelper.setUser(newUser);
            dispatch(
              AuthStore.Actions.refreshTokenSuccess(newSession, newUser)
            );
          }
        } else {
          // Try to login as Anonymous
          const loginResponse = await authService
            .signIn({ Device: deviceInfo })
            .toPromise();

          if (loginResponse.AuthorizationToken) {
            await StorageHelper.setUser(loginResponse.User);
            await StorageManager.deleteValue("channels");
            await StorageManager.setValue(
              "session",
              loginResponse.AuthorizationToken
            );

            newSession = loginResponse.AuthorizationToken;
          }
        }
      }

      if (!newSession) {
        dispatch(push(ROUTES.LOGIN));

        return Promise.reject(new Error("Unable to refresh token"));
      }

      originalRequest.headers["Authorization"] = "Bearer " + newSession.Token;
      processQueue(undefined, newSession.Token);

      return Promise.resolve(axios(originalRequest));
    } catch (error) {
      processQueue(error as IErrorModel, undefined);
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  }

  return Promise.reject(error);
};
