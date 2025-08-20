/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { AppConfig } from "../../app";
import { IErrorModel } from "../../models";

import { HttpClient } from "./HttpClient";

const CancelToken = axios.CancelToken;

export class HttpFactory {
  public baseUrl: string;

  private _requestInterceptors: {
    [key: string]: {
      onFulfilled?:
        | ((
            config: AxiosRequestConfig
          ) => AxiosRequestConfig | Promise<AxiosRequestConfig>)
        | undefined;
      onRejected?: ((error: IErrorModel) => any) | undefined;
    };
  } = {};

  private _responseInterceptors: {
    [key: string]: {
      onFulfilled?:
        | ((config: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>)
        | undefined;
      onRejected?: ((error: IErrorModel) => any) | undefined;
    };
  } = {};

  private static _instance: HttpFactory = new HttpFactory();

  private constructor() {
    this.baseUrl = AppConfig.ApiUrl;
  }

  static getInstance(): HttpFactory {
    if (!HttpFactory._instance) {
      HttpFactory._instance = new HttpFactory();
    }

    return HttpFactory._instance;
  }

  public getHttpClient(
    baseUrl?: string,
    ignoreHeader?: boolean,
    headers = {}
  ): HttpClient {
    const config: AxiosRequestConfig = {
      baseURL: baseUrl || this.baseUrl,
      headers,
    };

    const axiosInstance = axios.create(config);

    for (const interceptorKey in this._requestInterceptors) {
      const { onFulfilled, onRejected } =
        this._requestInterceptors[interceptorKey];
      axiosInstance.interceptors.request.use(onFulfilled, onRejected);
    }

    for (const interceptorKey in this._responseInterceptors) {
      const { onFulfilled, onRejected } =
        this._responseInterceptors[interceptorKey];
      axiosInstance.interceptors.response.use(onFulfilled, onRejected);
    }

    return new HttpClient(axiosInstance, CancelToken.source(), ignoreHeader);
  }

  public addRequestInterceptor(
    interceptorKey: string,
    onFulfilled?:
      | ((
          config: AxiosRequestConfig
        ) => AxiosRequestConfig | Promise<AxiosRequestConfig>)
      | undefined,
    onRejected?: (error: IErrorModel) => any
  ): void {
    this._requestInterceptors[interceptorKey] = { onFulfilled, onRejected };
  }

  public removeRequestInterceptor(interceptorKey: string): void {
    if (this._requestInterceptors[interceptorKey]) {
      delete this._requestInterceptors[interceptorKey];
    }
  }

  public addResponseInterceptor(
    interceptorKey: string,
    onFulfilled?:
      | ((config: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>)
      | undefined,
    onRejected?: (error: IErrorModel) => any
  ): void {
    this._responseInterceptors[interceptorKey] = { onFulfilled, onRejected };
  }

  public removeResponseInterceptor(interceptorKey: string): void {
    if (this._responseInterceptors[interceptorKey]) {
      delete this._responseInterceptors[interceptorKey];
    }
  }
}
