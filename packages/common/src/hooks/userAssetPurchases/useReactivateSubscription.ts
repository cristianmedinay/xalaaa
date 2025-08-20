/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useDispatch } from "react-redux";

import { IErrorModel, IUserAssetPurchasesListModel } from "../../models";
import { UserStore } from "../../store";

export const useReactivateSubscription = (meta?: {
  onSuccess?: (response?: IUserAssetPurchasesListModel) => void;
  onFailure?: (error?: IErrorModel) => void;
}) => {
  const dispatch = useDispatch();

  const reactivateSubscription = (userSubscriptionId: number) => {
    dispatch(
      UserStore.Actions.reactivateSubscription(userSubscriptionId, meta)
    );
  };

  return reactivateSubscription;
};
