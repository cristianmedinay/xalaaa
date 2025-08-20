/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useDispatch } from "react-redux";

import { IErrorModel, IUserAssetPurchasesListModel } from "../../models";
import { UserStore } from "../../store";

export const useChangeSubscriptionPaymentMethod = (meta?: {
  onSuccess?: (response?: IUserAssetPurchasesListModel) => void;
  onFailure?: (error?: IErrorModel) => void;
}) => {
  const dispatch = useDispatch();

  const changeSubscriptionPaymentMethod = (
    userSubscriptionId: number,
    paymentProvider: string
  ) => {
    console.log(userSubscriptionId, "id");
    dispatch(
      UserStore.Actions.changeSubscriptionPaymentMethod(
        userSubscriptionId,
        paymentProvider,
        meta
      )
    );
  };

  return changeSubscriptionPaymentMethod;
};
