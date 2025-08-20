/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import { DeviceOrientation } from "../enums";

export interface IDisplayContext {
  orientation: DeviceOrientation;
  width: number;
  height: number;
}

export const DisplayContext = React.createContext<IDisplayContext>({
  orientation: DeviceOrientation.Portrait,
  width: 0,
  height: 0,
});
