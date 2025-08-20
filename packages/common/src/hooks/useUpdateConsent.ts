/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useDispatch } from "react-redux";

import { IUserConsentModel } from "models";

import { UserStore } from "../store";

export const useUpdateConsent = () => {
  const dispatch = useDispatch();
  const updateConsent = (data: IUserConsentModel) => {
    dispatch(UserStore.Actions.updateUserConsent(data));
  };
  return updateConsent;
};
