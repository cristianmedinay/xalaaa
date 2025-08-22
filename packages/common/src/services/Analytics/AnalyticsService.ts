/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { IAnalyticsMarkerModel } from "models";

import { AppConfig } from "../../app/AppConfig";
import { HTTP_METHOD } from "../../constants";
import { AxiosSubscriber } from "../Common";
export class AnalyticsService {
  public sendAnalyticsMarker = (
    data: IAnalyticsMarkerModel
  ): Observable<null> =>
    new Observable((observer: Observer<null>) => {
      return new AxiosSubscriber(observer, {
        baseURL:
          (process.env.REACT_APP_KONODRAC_ANALYTICS_URL as string) ||
          AppConfig.KonodracUrl,
        data,
        method: HTTP_METHOD.POST,
        url: "",
        ignoreHeader: true,
      });
    });
}
