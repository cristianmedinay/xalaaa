/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AxiosRequestConfig } from "axios";

import { IErrorModel, ITokenModel } from "../../models";
import { StorageManager } from "../StorageManager";

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
