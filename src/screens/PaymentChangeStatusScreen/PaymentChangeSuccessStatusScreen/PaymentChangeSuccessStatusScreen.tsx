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
import { ROUTES } from "../../../constants/routes";

export const PaymentChangeSuccessStatusScreen: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const onBackClick = () => {
    history.push(ROUTES.SETTINGS_MY_ORDERS);
  };

  return (
    <div className="PaymentChangeSuccessStatus">
      <Result
        type="success"
        title={t("PAYMENT_CHANGE_SUCCESS__TITLE")}
        subtitle={t("PAYMENT_CHANGE_SUCCESS__SUBTITLE")}
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
