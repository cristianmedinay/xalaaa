/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Dispatch,
  Middleware,
  Store,
} from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import * as AnalyticsStore from "./analytics";
import * as AudioStore from "./audio";
import * as AuthStore from "./auth";
import * as ConfigurationStore from "./configuration";
import * as ConfirmationDialogStore from "./confirmationDialog";
import * as CoreStore from "./core";
import * as MediaStore from "./media";
import * as NotificationStore from "./notification";
import * as OfflineStore from "./offlineMode";
import * as PaymentStore from "./payments";
import * as SearchStore from "./search";
import { IAppLocationState, IAppState, setAppStore } from "./types";
import * as UserStore from "./user";

export * from "./types";
export {
  AuthStore,
  ConfigurationStore,
  MediaStore,
  UserStore,
  CoreStore,
  PaymentStore,
  AnalyticsStore,
  AudioStore,
  SearchStore,
  NotificationStore,
  OfflineStore,
  ConfirmationDialogStore,
};

export type AppActions =
  | AuthStore.Types.AuthActionsTypes
  | UserStore.Types.UserActionsTypes
  | CoreStore.Types.CoreActionsTypes
  | ConfigurationStore.Types.ConfigurationActionsTypes
  | MediaStore.Types.MediaActionsTypes
  | AnalyticsStore.Types.AnalyticsMarkerActionsTypes
  | NotificationStore.Types.NotificationActionTypes
  | AudioStore.Types.AudioActionTypes
  | SearchStore.Types.SearchActionTypes
  | OfflineStore.Types.OfflineModeActionTypes
  | ConfirmationDialogStore.Types.ConfirmationDialogActionTypes;

export let appStore: Store<IAppState, AppActions>;

let _history: History<IAppLocationState> | undefined = undefined;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => useReduxDispatch<Dispatch<AppActions>>();
export const useSelector: TypedUseSelectorHook<IAppState> = useReduxSelector;
export const clearHistory = () => {
  if (_history) {
    // @ts-ignore
    _history.entries = [];
    // @ts-ignore
    _history.index = -1;
  }
};
export const getHistory = () => _history;

const epicMiddleware = createEpicMiddleware<
  AppActions,
  AppActions,
  IAppState
>();

const reducers = {
  core: CoreStore.Reducers.coreReducer,
  configuration: ConfigurationStore.Reducers.configurationReducer,
  media: MediaStore.Reducers.mediaReducer,
  auth: AuthStore.Reducers.authReducer,
  user: UserStore.Reducers.userReducer,
  payment: PaymentStore.Reducers.paymentsReducer,
  analytics: AnalyticsStore.Reducers.analyticsReducer,
  notification: NotificationStore.Reducers.notificationReducers,
  audio: AudioStore.Reducers.audioReducers,
  search: SearchStore.Reducers.searchReducers,
  offlineMode: OfflineStore.Reducers.offlineModeReducers,
  confirmationDialog:
    ConfirmationDialogStore.Reducers.confirmationDialogReducer,
};

export const rootEpics = combineEpics(
  ...CoreStore.Epics.coreEpics,
  ...ConfigurationStore.Epics.configurationEpics,
  ...MediaStore.Epics.mediaEpics,
  ...AuthStore.Epics.authEpics,
  ...UserStore.Epics.userEpics,
  ...PaymentStore.Epics.paymentsEpics,
  ...AnalyticsStore.Epics.analyticsEpics,
  ...AudioStore.Epics.AudioEpics,
  ...SearchStore.Epics.SearchEpics,
  ...OfflineStore.Epics.OfflineModeEpics,
  ...NotificationStore.Epics.notificationEpics
);

const composeEnhancers =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export class ReduxStoreConfigurator {
  private middlewares: Middleware[] = [epicMiddleware];

  private initialState: IAppState = {
    core: CoreStore.Reducers.initialState,
    configuration: ConfigurationStore.Reducers.initialState,
    media: MediaStore.Reducers.initialState,
    auth: AuthStore.Reducers.initialState,
    user: UserStore.Reducers.initialState,
    payment: PaymentStore.Reducers.initialState,
    analytics: AnalyticsStore.Reducers.initialState,
    search: SearchStore.Reducers.initialState,
    notification: NotificationStore.Reducers.initialState,
    offlineMode: OfflineStore.Reducers.initialState,
    confirmationDialog: ConfirmationDialogStore.Reducers.initialState,
  };

  constructor(
    history?: History<IAppLocationState>,
    middlewares?: Middleware[],
    initialState?: IAppState
  ) {
    _history = history;

    if (middlewares && middlewares.length > 0) {
      this.middlewares = this.middlewares.concat(...middlewares);
    }

    this.initialState = initialState ? initialState : this.initialState;
  }

  public initStore() {
    appStore = this.configureStore();
    epicMiddleware.run(rootEpics);
    setAppStore(appStore);

    return appStore;
  }

  private createRootReducer(history?: History<IAppLocationState>) {
    let appReducer: any = combineReducers(reducers);

    if (history) {
      appReducer = combineReducers({
        router: connectRouter<IAppLocationState>(history),
        ...reducers,
      });
    }

    return (state: IAppState | undefined, action: AppActions) => {
      return appReducer(state, action);
    };
  }

  private createEnhancer(middlewares: Middleware[], history?: History) {
    let enhancer = composeEnhancers(applyMiddleware(...middlewares));

    if (history) {
      enhancer = composeEnhancers(
        applyMiddleware(routerMiddleware(history), ...middlewares)
      );
    }
    return enhancer;
  }

  private configureStore() {
    const enhancer = this.createEnhancer(this.middlewares, _history);
    const rootReducer = this.createRootReducer(_history);

    return createStore(rootReducer, this.initialState, enhancer);
  }
}
