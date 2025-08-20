/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { RouteHelper } from "@xala/common";
import React from "react";
import { useTranslation } from "react-i18next";

import { MediaButtonVariant } from "enums";

import { ROUTES } from "../../constants";
import { MediaButton } from "../MediaButton";

import "./ButtonDeleteAccount.scss";

interface Props {
  openMenuHandler: (toggle: boolean) => void;
  isVisible: boolean;
}

export const ButtonDeleteAccount = ({ openMenuHandler, isVisible }: Props) => {
  const { t } = useTranslation();

  if (!isVisible) {
    return null;
  }

  const onDeleteAccountConfirm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    RouteHelper.goTo(ROUTES.DELETE_ACCOUNT);
  };

  const onDeleteAccountCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    openMenuHandler(false);
  };

  return (
    <div className="ModalOverlay" onClick={() => openMenuHandler(false)}>
      <div className="ModalContent">
        <div className="ModalContent_content">
          <h2>{t("DELETE_ACCOUNT__QUESTION")}</h2>
          <MediaButton
            variant={MediaButtonVariant.Secondary}
            onClick={onDeleteAccountConfirm}
          >
            {t("DELETE_ACCOUNT__BUTTON_CONFIRM")}
          </MediaButton>
          <MediaButton
            variant={MediaButtonVariant.Secondary}
            onClick={onDeleteAccountCancel}
          >
            {t("DELETE_ACCOUNT__BUTTON_CANCEL")}
          </MediaButton>
        </div>
      </div>
    </div>
  );
};
