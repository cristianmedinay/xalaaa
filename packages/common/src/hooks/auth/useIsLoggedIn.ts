/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ANONYMOUS_ID } from "../../constants";
import { useSelector } from "../../store";

export const useIsLoggedIn = () =>
  useSelector((state) =>
    state.auth.user?.Id ? state.auth.user.Id !== ANONYMOUS_ID : false
  );
