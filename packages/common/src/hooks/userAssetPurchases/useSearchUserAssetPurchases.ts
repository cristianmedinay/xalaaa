/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useDispatch } from "react-redux";

import { IPaymentSearchFilterModel, IUserInfoModel } from "../../models";
import { UserStore } from "../../store";

export const useSearchUserAssetPurchases = (user?: IUserInfoModel) => {
  const dispatch = useDispatch();

  const searchUserAssetPurchases = (filter: IPaymentSearchFilterModel) => {
    if (user) {
      dispatch(
        UserStore.Actions.searchUserAssetPurchases({
          ...filter,
          UserId: user.Id,
          PageSize: 10,
          IncludeCount: true,
        })
      );
    }
  };

  return searchUserAssetPurchases;
};
