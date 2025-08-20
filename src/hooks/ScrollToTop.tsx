/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useEffect } from "react";
import { useHistory } from "react-router";

export function ScrollToTop() {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      document.body.scrollTo({
        top: 0,
        behavior: "auto",
      });
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
}
