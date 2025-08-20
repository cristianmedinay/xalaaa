/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from "axios";

import { AppConfig } from "../../app";

export class HttpClient {
  public http: AxiosInstance;
  public cancelToken?: CancelTokenSource;
  public ignoreHeader?: boolean;

  constructor(
    axiosInstance: AxiosInstance,
    cancelTokenSource: CancelTokenSource,
    ignoreHeader?: boolean
  ) {
    this.cancelToken = cancelTokenSource;
    this.http = axiosInstance;
    this.ignoreHeader = ignoreHeader;
  }

  public async get(url: string, config?: AxiosRequestConfig) {
    const cfg = this.mergeConfig(config);
    return this.http.get(url, cfg);
  }

  public async post(url: string, data: any, config?: AxiosRequestConfig) {
    return this.http.post(url, data, this.mergeConfig(config));
  }

  public async put(url: string, data: any, config?: AxiosRequestConfig) {
    return this.http.put(url, data, this.mergeConfig(config));
  }

  public async patch(url: string, data: any, config?: AxiosRequestConfig) {
    return this.http.patch(url, data, this.mergeConfig(config));
  }

  public async delete(url: string, config?: AxiosRequestConfig) {
    return this.http.delete(url, this.mergeConfig(config));
  }

  public async head(url: string, config?: AxiosRequestConfig) {
    return this.http.head(url, this.mergeConfig(config));
  }

  public async cancel() {
    return this.cancelToken?.cancel();
  }

  private mergeConfig(config: any = {}) {
    if (this.ignoreHeader) {
      return {
        ...config,
        cancelToken: this.cancelToken?.token,
      };
    } else {
      return {
        ...config,
        cancelToken: this.cancelToken?.token,
        headers: {
          ...(AppConfig.TenantOrigin
            ? { "X-TenantOrigin": AppConfig.TenantOrigin }
            : {}),
          ...config.headers,
        },
      };
    }
  }
}
