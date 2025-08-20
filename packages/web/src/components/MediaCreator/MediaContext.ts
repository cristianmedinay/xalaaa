/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAssetModel } from "@xala/common";
import { createContext } from "react";

const defaultValue = {
  data: { Id: 0 },
  onReload: () => null,
};

export interface IMediaContext {
  data: IAssetModel;
  onReload: () => void;
}

export const MediaContext = createContext<IMediaContext>(defaultValue);
