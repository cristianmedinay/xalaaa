/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { createReducers } from "../utils";

import { ActionTypes } from "./consts";
import { IConfirmationDialog } from "./IConfirmationDialog";
import { ConfirmationDialogActionTypes } from "./types";

export const initialState: IConfirmationDialog = {
  confirmMessage: "",
  isVisible: false,
  onConfirm: () => {
    // noop
  },
  onClose: () => {
    // noop
  },
};

export const confirmationDialogReducer = createReducers(initialState, {
  [ActionTypes.SHOW_CONFIRMATION_DIALOG]: (
    state,
    action: ConfirmationDialogActionTypes
  ) => {
    const { confirmMessage, onConfirm, onClose } =
      action.payload as IConfirmationDialog;
    return {
      ...state,
      confirmMessage,
      isVisible: true,
      onConfirm: onConfirm,
      onClose: onClose,
    };
  },
  [ActionTypes.HIDE_CONFIRMATION_DIALOG]: () => ({
    ...initialState,
  }),
});
