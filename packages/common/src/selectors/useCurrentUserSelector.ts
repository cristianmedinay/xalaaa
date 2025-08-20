/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useSelector } from "react-redux";

import { IAppState } from "../store/types";

export const useCurrentUserSelector = () => {
  const user = useSelector((state: IAppState) => state.auth.user);
  return user;
};
