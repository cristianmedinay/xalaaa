/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaListModel } from "../models";

export const getMediaFavouriteListId = (mediaList: {
  [key: string]: IMediaListModel;
}) => {
  for (const key in mediaList) {
    if (mediaList[key].Filter?.Type === "MY_LIST") return key;
  }
};
