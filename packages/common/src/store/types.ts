/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { RouterState } from "connected-react-router";
import { AnyAction, Store } from "redux";

import * as AnalyticsStore from "./analytics";
import { IAudioState } from "./audio/types";
import * as AuthStore from "./auth";
import * as ConfigurationStore from "./configuration";
import { IConfirmationDialog } from "./confirmationDialog/IConfirmationDialog";
import * as CoreStore from "./core";
import * as MediaStore from "./media";
import { INotificationState } from "./notification/INotificationState";
import { IOfflineMode } from "./offlineMode/IOfflineMode";
import * as PaymentStore from "./payments";
import * as SearchStore from "./search";
import * as UserStore from "./user";

export interface IAppLocationState {
  from?: string;
}

export interface IAppState {
  core: CoreStore.Types.ICoreState;
  configuration: ConfigurationStore.Types.IConfigurationState;
  media: MediaStore.Types.IMediaState;
  auth: AuthStore.Types.IAuthState;
  router?: RouterState<IAppLocationState>;
  user: UserStore.Types.IUserState;
  payment: PaymentStore.Types.IPaymentsState;
  analytics: AnalyticsStore.Types.IAnalyticsMarkerState;
  notification?: INotificationState;
  audio?: IAudioState;
  search: SearchStore.Types.ISearchState;
  offlineMode: IOfflineMode;
  confirmationDialog: IConfirmationDialog;
}

let appStore: Store<IAppState, AnyAction>;

export const setAppStore = (store: Store<IAppState, AnyAction>) => {
  appStore = store;
};

export function dispatch(action: AnyAction) {
  if (appStore && appStore.dispatch) {
    appStore.dispatch(action);
  }
}
