/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useSelector } from "react-redux";

import { IMediaModel } from "models";

import { IAppState } from "../store/types";

export const useIsUserBoughtProduct = (media: IMediaModel) => {
  return useSelector((state: IAppState) => state.auth.user?.Products)?.find(
    (userProduct) =>
      userProduct.Id === media?.Id ||
      media.Products?.find((product) => userProduct.Id === product.Id)
  );
};
