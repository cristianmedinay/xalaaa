/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AxiosRequestConfig } from "axios";

export const HTTP_METHOD = {
  DELETE: "DELETE",
  GET: "GET",
  HEAD: "HEAD",
  PATCH: "PATCH",
  POST: "POST",
  PUT: "PUT",
};

export const HTTP_ERROR = {
  ACCESS_DENIED: 403,
  AUTHENTICATION_FAILED: 401,
  DATA_NOT_FOUND: 404,
};

export interface IRequestInfo<DataType> {
  axiosConfig?: AxiosRequestConfig;
  baseURL?: string;
  data?: DataType;
  method: string;
  serviceDomain: string;
  url: string;
}

export const HTTP_MESSAGE = {
  NETWORK_ERROR: "Network Error",
};

export enum HTTP_RESPONSE_TYPE {
  SUCCESS,
  WARNING,
  ERROR,
}
