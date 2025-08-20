/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import { MediaButtonVariant } from "enums";

import { MediaButton, Result } from "../../../components";

export const PaymentChangeCancelStatusScreen: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const onBackClick = () => {
    history.go(-2);
  };

  return (
    <div className="PaymentChangeCancelStatus">
      <Result
        type="error"
        title={t("PAYMENT_CHANGE_CANCEL__TITLE")}
        subtitle={t("PAYMENT_CHANGE_CANCEL__SUBTITLE")}
      />

      <div>
        <MediaButton
          className="FormButton"
          type="button"
          variant={MediaButtonVariant.Primary}
          onClick={onBackClick}
        >
          {t("COMMON__BUTTON_GO_BACK")}
        </MediaButton>
      </div>
    </div>
  );
};
