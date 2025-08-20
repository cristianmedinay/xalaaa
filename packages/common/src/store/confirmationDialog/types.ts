/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Actions } from "./actions";

export type ConfirmationDialogActionTypes =
  | ReturnType<typeof Actions.showConfirmationDialog>
  | ReturnType<typeof Actions.hideConfirmationDialog>;
