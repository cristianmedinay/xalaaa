/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useSelector } from "react-redux";

import { IAppState } from "../store/types";

export const useUserPurchaseSelector = (userSubscriptionId?: number) => {
  const purchase = useSelector((state: IAppState) =>
    userSubscriptionId ? state.user.purchase[userSubscriptionId] : undefined
  );
  return purchase;
};
