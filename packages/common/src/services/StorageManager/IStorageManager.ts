/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { StorageContent } from "../../models";

export interface IStorageManager {
  setValue: (key: keyof StorageContent, val: any) => Promise<void>;

  getValue: (key: keyof StorageContent) => Promise<any | undefined>;

  deleteValue: (name: keyof StorageContent) => Promise<void>;

  clearAll?: () => Promise<void>;
}
