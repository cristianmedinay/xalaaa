/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AppConfig } from "../../app";

import { IDataProvider } from "./IDataProvider";
import { InternalDataProvider } from "./Internal";

let dataProvider: IDataProvider;

// Add providers for projects here base on env value
switch (AppConfig.DataProvider) {
  default:
    dataProvider = new InternalDataProvider();
    break;
}

export const DataProvider: IDataProvider = dataProvider;
