/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { AppConfig } from "../../app/AppConfig";
import { HTTP_METHOD } from "../../constants";
import { NotificationEventType } from "../../enums";
import { AuthorizationHelper } from "../../helpers/authorizationHelper";
import { IAuthResponseModel, INotification } from "../../models";
import { AxiosSubscriber } from "../Common";
import { SignalRClient } from "../SignalR/SignalR";

export class NotificationClient extends SignalRClient {
  public static instance: NotificationClient;

  public static getInstance() {
    if (NotificationClient.instance) {
      return NotificationClient.instance;
    }

    NotificationClient.instance = new NotificationClient();

    return NotificationClient.instance;
  }

  public markAsRead = async (ids: number[]) => {
    try {
      this.connection?.invoke("MarkAsRead", ids);
    } catch (err) {
      console.error("Err marking as read", err);
    }
  };

  public start = async <T extends INotification>(
    callback?: (data: T) => void
  ) => {
    const token = (await AuthorizationHelper.session()).Token;

    const queryParams = {
      tenant_origin: AppConfig.TenantOrigin,
      access_token: `${token}`,
    };
    const queryString = new URLSearchParams(queryParams).toString();

    this.url = `${AppConfig.ApiUrl}/notifications/hub/?${queryString}`;
    try {
      await this.initialize();
      this.handleEvents(callback);
      await this.open();
    } catch (error) {
      // TODO Add proper error handling
      console.error(error);
    }
  };

  public confirmRead = (guid: string): Observable<IAuthResponseModel> =>
    new Observable((observer: Observer<IAuthResponseModel>) => {
      return new AxiosSubscriber(observer, {
        method: HTTP_METHOD.GET,
        url: `notifications/ConfirmRead/${guid}`,
      });
    });

  private handleEvents = <T extends INotification>(
    callback?: (data: T) => void
  ) => {
    // TODO Decide if the notifications should go through redux store or based on callback
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.connection?.on(NotificationEventType.NotificationReceived, (data) => {
      const notificationData: T = JSON.parse(data.DataContent);
      notificationData.NotificationId = data.Id;
      callback?.(notificationData);
    });
  };
}
