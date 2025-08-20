/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import { useTranslation } from "react-i18next";

import { MediaButtonVariant } from "enums";

import { Dialog } from "..";
import { MediaButton } from "../..";

import "./ConfirmDialog.scss";

export interface IConfirmDialogProps {
  confirmMessage?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
  visible?: boolean;
  onConfirm: () => void;
  onClose?: () => void;
}

export const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
  confirmMessage,
  children,
  loading,
  visible = false,
  onConfirm,
  onClose,
}) => {
  const { t } = useTranslation();

  const closeModal = () => {
    onClose?.();
  };

  return (
    <>
      <div>{children}</div>
      <Dialog
        wrapClassName="ConfirmDialog"
        destroyOnClose={true}
        footer={null}
        visible={visible}
        onCancel={closeModal}
      >
        <span className="ConfirmDialog__message">
          {confirmMessage ?? t("CONFIRM_DIALOG__CONFIRM_MESSAGE")}
        </span>
        <div className="ConfirmDialog__actions">
          <MediaButton
            variant={MediaButtonVariant.Transparent}
            onClick={closeModal}
          >
            {t("CONFIRM_DIALOG__CANCEL")}
          </MediaButton>
          <MediaButton
            variant={MediaButtonVariant.Primary}
            loading={loading}
            onClick={onConfirm}
          >
            {t("CONFIRM_DIALOG__CONFIRM")}
          </MediaButton>
        </div>
      </Dialog>
    </>
  );
};
