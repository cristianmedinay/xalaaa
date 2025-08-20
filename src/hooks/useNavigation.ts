/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useHistory } from "react-router";

export const useNavigation = () => {
  const history = useHistory();

  const goTo = (path: string) => {
    history.push(path);
  };

  return goTo;
};
