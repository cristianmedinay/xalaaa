/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useDispatch } from "react-redux";

import { UserStore } from "../../store";

export const useGetUserPurchasesAggregated = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(UserStore.Actions.getUserPurchasesAggregated());
  };
};
