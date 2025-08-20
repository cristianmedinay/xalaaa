/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { HTTP_METHOD } from "../../../../constants";
import { PlatformType } from "../../../../enums";
import { IConfigurationModel } from "../../../../models";
import { AxiosSubscriber } from "../../../../services";

export class ConfigurationService {
  get url(): string {
    return "/Configurations";
  }

  public getConfiguration = (): Observable<IConfigurationModel> =>
    new Observable(
      (observer: Observer<IConfigurationModel>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            timeout: 60000,
            headers: {
              Authorization: "",
              "Cache-Control": "no-cache",
            },
          },
          method: HTTP_METHOD.GET,
          url: `${this.url}/GetConfiguration?platformCode=${PlatformType.Web}`,
        })
    );

  public getCurrentConfigVersion = (): Observable<number> =>
    new Observable(
      (observer: Observer<number>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `${this.url}/GetCurrentConfigurationVersion`,
        })
    );

  public getConfigurationForUser = (
    userId: number
  ): Observable<IConfigurationModel> =>
    new Observable(
      (observer: Observer<IConfigurationModel>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {
              userId,
            },
          },
          method: HTTP_METHOD.GET,
          url: `${this.url}/GetConfigurationForUser`,
        })
    );

  public saveConfiguration = (
    data: IConfigurationModel
  ): Observable<IConfigurationModel> =>
    new Observable(
      (observer: Observer<IConfigurationModel>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {},
          },
          data,
          method: HTTP_METHOD.PUT,
          url: `${this.url}/SaveConfiguration`,
        })
    );
}
