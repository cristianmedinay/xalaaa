/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import { useTranslation } from "react-i18next";

import "../../Form/Form.scss";
import "../AuthForm.scss";

export const ResendConfirmationSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="ResendConfirmationSuccess AuthForm">
      <div className="form">
        <h1 className="text-upper text-center">
          {t("RESEND_CONFIRMATION_SUCCESS__TITLE")}
        </h1>
        <p className="text-center text-large">
          {t("RESEND_CONFIRMATION_SUCCESS__SUBTITLE")}
        </p>
        <p className="text-center text-large">
          {t("RESEND_CONFIRMATION_SUCCESS__MESSAGE_1")}
        </p>
        <p className="text-center text-large">
          {t("RESEND_CONFIRMATION_SUCCESS__MESSAGE_2")}
        </p>
        <p className="text-center text-large">
          {t("RESEND_CONFIRMATION_SUCCESS__MESSAGE_3")}
        </p>
      </div>
    </div>
  );
};
