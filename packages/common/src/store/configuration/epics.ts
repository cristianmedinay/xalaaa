/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ActionsObservable, ofType, StateObservable } from "redux-observable";
import { switchMap } from "rxjs/operators";

import { IErrorModel } from "models";

import { DeviceHelper } from "../../helpers";
import { DataProvider } from "../../providers/DataProvider";
import { IAppState } from "../types";

import * as Actions from "./actions";
import * as Consts from "./consts";
import {
  IGetConfigurationAction,
  IGetConfigurationOfflineAction,
} from "./types";

const getConfigurationEpic = (
  action$: ActionsObservable<IGetConfigurationAction>,
  _state: StateObservable<IAppState>
) =>
  action$.pipe(
    ofType(Consts.GET_CONFIGURATION),
    switchMap(async ({ isNewConfigAvailable }) => {
      try {
        const config = await DataProvider.getConfiguration(
          isNewConfigAvailable
        );
        const device = await DeviceHelper.getDeviceInfo();
        if (config) {
          return Actions.getConfigurationSuccess(config, device);
        }
      } catch (error) {
        console.log("configuration error: ", error);
        return Actions.getConfigurationFailure(error as IErrorModel);
      }
    })
  );

const getConfigurationOfflineEpic = (
  action$: ActionsObservable<IGetConfigurationOfflineAction>,
  _state: StateObservable<IAppState>
) =>
  action$.pipe(
    ofType(Consts.GET_CONFIGURATION_OFFLINE),
    switchMap(async () => {
      try {
        const config = await DataProvider.getConfigurationOffline();
        const device = await DeviceHelper.getDeviceInfo();
        if (config) {
          return Actions.getConfigurationOfflineSuccess(config, device);
        } else return Actions.getConfigurationOfflineSuccess({}, device);
      } catch (error) {
        console.log("configuration error: ", error);
        return Actions.getConfigurationFailure(error as IErrorModel);
      }
    })
  );
export const configurationEpics = [
  getConfigurationEpic,
  getConfigurationOfflineEpic,
];
