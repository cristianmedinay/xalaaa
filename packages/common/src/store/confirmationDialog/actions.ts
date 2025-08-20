/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { createPayloadAction } from "../utils";

import { ActionTypes } from "./consts";
import { IConfirmationDialog } from "./IConfirmationDialog";

const showConfirmationDialog = createPayloadAction<IConfirmationDialog>(
  ActionTypes.SHOW_CONFIRMATION_DIALOG
);

const hideConfirmationDialog = createPayloadAction<void>(
  ActionTypes.HIDE_CONFIRMATION_DIALOG
);

export const Actions = {
  showConfirmationDialog,
  hideConfirmationDialog,
};
