/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState } from "../types";

const confirmationDialogSelector = (state: IAppState) =>
  state.confirmationDialog;

export const Selectors = {
  confirmationDialogSelector,
};
