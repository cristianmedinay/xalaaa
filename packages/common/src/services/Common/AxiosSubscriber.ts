/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AxiosError, AxiosResponse } from "axios";
import { Observer, Subscriber } from "rxjs";

import { HTTP_METHOD, HTTP_RESPONSE_TYPE, IRequestInfo } from "../../constants";
import { IErrorModel, toErrorModel } from "../../models";
import { HttpClient, HttpFactory } from "../Http";

const httpFactory = HttpFactory.getInstance();

export class AxiosSubscriber extends Subscriber<any> {
  public httpClient: HttpClient;

  constructor(observer: Observer<any>, requestInfo: any) {
    super(observer);

    this.httpClient = httpFactory.getHttpClient(
      requestInfo.baseURL,
      requestInfo.ignoreHeader,
      requestInfo.headers
    );

    switch (requestInfo.method) {
      case HTTP_METHOD.GET:
        this.makeGetRequest(observer, requestInfo);
        break;
      case HTTP_METHOD.POST:
        this.makePostRequest(observer, requestInfo);
        break;
      case HTTP_METHOD.PUT:
        this.makePutRequest(observer, requestInfo);
        break;
      case HTTP_METHOD.PATCH:
        this.makePatchRequest(observer, requestInfo);
        break;
      case HTTP_METHOD.DELETE:
        this.makeDeleteRequest(observer, requestInfo);
        break;
      case HTTP_METHOD.HEAD:
        this.makeHeadRequest(observer, requestInfo);
        break;
    }
  }

  public unsubscribe() {
    super.unsubscribe();
    this.httpClient
      .cancel()
      .then(() => null)
      .catch((err: any) => console.warn(err));
  }

  private makeGetRequest(
    observer: Observer<any>,
    { axiosConfig = {}, url }: IRequestInfo<never>
  ) {
    this.httpClient
      .get(url, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        if (this._checkResponseError(response)) {
          observer.error(toErrorModel(response.data));
        } else {
          observer.next(response.data);
          observer.complete();
        }
      })
      .catch((error: any) => {
        observer.error(this.getError(error));
      });
  }

  private makePostRequest(
    observer: Observer<any>,
    { axiosConfig = {}, data, url }: IRequestInfo<any>
  ) {
    this.httpClient
      .post(url, data, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        if (this._checkResponseError(response)) {
          observer.error(toErrorModel(response.data));
        } else {
          observer.next(response.data);
          observer.complete();
        }
      })
      .catch((error: AxiosError<any>) => {
        observer.error(this.getError(error));
      });
  }

  private makePutRequest(
    observer: Observer<any>,
    { axiosConfig = {}, data, url }: IRequestInfo<any>
  ) {
    this.httpClient
      .put(url, data, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        if (this._checkResponseError(response)) {
          observer.error(toErrorModel(response.data));
        } else {
          observer.next(response.data);
          observer.complete();
        }
      })
      .catch((error: AxiosError<any>) => {
        observer.error(this.getError(error));
      });
  }

  private makePatchRequest(
    observer: Observer<any>,
    { axiosConfig = {}, data, url }: IRequestInfo<any>
  ) {
    this.httpClient
      .patch(url, data, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error: AxiosError<any>) => {
        observer.error(this.getError(error));
      });
  }

  private makeDeleteRequest(
    observer: Observer<any>,
    { axiosConfig = {}, url }: IRequestInfo<never>
  ) {
    this.httpClient
      .delete(url, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        if (this._checkResponseError(response)) {
          observer.error(toErrorModel(response.data));
        } else {
          observer.next(response.data);
          observer.complete();
        }
      })
      .catch((error: AxiosError<any>) => {
        observer.error(this.getError(error));
      });
  }

  private makeHeadRequest(
    observer: Observer<any>,
    { axiosConfig = {}, url }: IRequestInfo<any>
  ) {
    this.httpClient
      .head(url, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error: AxiosError<any>) => {
        observer.error(this.getError(error));
      });
  }

  private _checkResponseError(response: AxiosResponse<any>): boolean {
    return response.data.ResultType === HTTP_RESPONSE_TYPE.ERROR;
  }

  private getError(axiosError: AxiosError<any>): IErrorModel {
    if (axiosError.response) {
      const error: IErrorModel = {
        ...axiosError.response.data,
      };

      switch (axiosError.response.status) {
        case 401:
          if (!error.Message) {
            error.Message = `Unauthorized access.`;
          }
          break;
        case 403:
          if (!error.Message) {
            error.Message = `You don't have permissions to access.`;
          }
          break;
      }

      return error;
    }

    return {
      Message: axiosError.message,
    };
  }
}
