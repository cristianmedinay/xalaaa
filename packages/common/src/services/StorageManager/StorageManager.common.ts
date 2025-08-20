/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { yieldToMain } from "../../helpers";
import { StorageContent } from "../../models";

import { IStorageManager } from "./IStorageManager";

export class StorageManagerCommon implements IStorageManager {
  public setValue = async (key: keyof StorageContent, val: any) => {
    if (!localStorage) {
      console.warn("StorageManager: localStorage is not defined");
      return;
    }
    // Let's convert `undefined` values to `null` to get the value consistent
    if (val === undefined) {
      val = null;
    } else {
      val = JSON.stringify(val);

      yieldToMain();
    }

    try {
      localStorage.setItem(key, val);

      yieldToMain();

      return;
    } catch (e) {
      console.error(`Cannot save key: ${key} to localstorage`, e);
    }
  };

  public getValue = async (key: keyof StorageContent) => {
    if (!localStorage) {
      console.warn("StorageManager: localStorage is not defined");
      return undefined;
    }

    const item = localStorage ? localStorage.getItem(key) : null;

    if (!item || item === "null") {
      return undefined;
    }

    try {
      const parsedItem = JSON.parse(item);

      yieldToMain();

      return parsedItem;
    } catch (e) {
      console.error(`Cannot parse key: ${key} from localstorage`, e);
      return undefined;
    }
  };

  public deleteValue = async (name: keyof StorageContent) => {
    if (!localStorage) {
      console.warn("StorageManager: localStorage is not defined");
      return;
    }

    localStorage.removeItem(name);
    yieldToMain();
  };

  public clearAll = async () => {
    if (!localStorage) {
      console.warn("StorageManager: localStorage is not defined");
      return;
    }

    localStorage.clear();
    yieldToMain();
  };
}
