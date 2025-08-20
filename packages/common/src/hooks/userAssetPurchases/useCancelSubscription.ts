/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useDispatch } from "react-redux";

import { IErrorModel, IUserAssetPurchasesListModel } from "../../models";
import { UserStore } from "../../store";

export const useCancelSubscription = (meta?: {
  onSuccess?: (response?: IUserAssetPurchasesListModel) => void;
  onFailure?: (error?: IErrorModel) => void;
}) => {
  const dispatch = useDispatch();

  const cancelSubscription = (userSubscriptionId: number) => {
    dispatch(UserStore.Actions.cancelSubscription(userSubscriptionId, meta));
  };

  return cancelSubscription;
};
