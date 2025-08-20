/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { osName } from "react-device-detect";

import { PlatformType } from "../enums";
import { IUserDeviceModel } from "../models";
import { StorageManager } from "../services";

import { GuidHelper } from "./guid.helper";

export class DeviceHelper {
  static getDeviceInfo = async (): Promise<IUserDeviceModel> => {
    const info: IUserDeviceModel = {
      PlatformCode: PlatformType.Web,
    };

    let osid = await StorageManager.getValue("osid");

    if (!osid) {
      osid = GuidHelper.newGuid();
      await StorageManager.setValue("osid", osid);
    }

    info.Name = `${osName} (${osid})`;

    const firebaseToken = await StorageManager.getValue("firebaseTokenFCM");

    info.FirebaseToken = firebaseToken || process.env.REACT_APP_FIREBASE_TOKEN;

    return info as IUserDeviceModel;
  };
}
