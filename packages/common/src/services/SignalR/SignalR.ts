/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  HttpError,
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";

import { HTTP_ERROR } from "../../constants/http";
import { AuthorizationHelper } from "../../helpers/authorizationHelper";

import {
  initAutoReconnectTimeouts,
  initConnectionReconnectTimeout,
} from "./SignalRUtility";

// TODO Error handling, refactoring, reconnecting

export class SignalRClient {
  private initConnectionReconnectTimeout = initConnectionReconnectTimeout;

  private initAutoReconnectTimeouts = initAutoReconnectTimeouts;

  public url = "";

  public connection?: HubConnection;

  public initialize = async () => {
    const isLoggedIn = await AuthorizationHelper.isLoggedIn();

    if (!isLoggedIn) {
      return;
    }

    // Builder
    this.build();
  };

  private build = () => {
    this.connection = new HubConnectionBuilder()
      .withUrl(this.url, {
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect(this.initAutoReconnectTimeouts)
      .configureLogging(LogLevel.Debug)
      .build();
  };

  public open = async () => {
    const shouldOpen =
      this.checkConnectionState(HubConnectionState.Disconnected) ||
      !this.checkConnectionState(HubConnectionState.Connecting);

    if (!shouldOpen) {
      return;
    }

    try {
      await this.connection?.start();
    } catch (error) {
      console.error("connect error", JSON.stringify(error));
      if (!(error instanceof HttpError)) {
        return;
      }

      if (error.statusCode === HTTP_ERROR.ACCESS_DENIED) {
        this.close();
        return;
      }

      setTimeout(() => this.open(), this.initConnectionReconnectTimeout);
    }
  };

  public close = async () => {
    const shouldClose =
      !this.checkConnectionState(HubConnectionState.Disconnected) ||
      !this.checkConnectionState(HubConnectionState.Disconnecting);

    if (shouldClose) {
      return this.connection?.stop();
    }
  };

  public on = <T>(event: string, callback: (data: T) => void) => {
    this.connection?.on(event, callback);
  };

  public off = (event: string) => {
    this.connection?.off(event);
  };

  public checkConnectionState = (stateType: HubConnectionState): boolean => {
    return this.connection?.state === stateType;
  };
}
