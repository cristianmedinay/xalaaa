/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { AuthStore } from "@xala/common";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { MediaButton } from "components";
import { MediaButtonVariant } from "enums";

import "./DeleteAccountSuccessScreen.scss";

import { useDispatch } from "react-redux";

export const DeleteAccountSuccessScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleSignOut = useCallback(() => {
    dispatch(AuthStore.Actions.signOut());
  }, [dispatch]);

  return (
    <div className="DeleteAccountSuccessScreen">
      <div className="DeleteAccountSuccessScreen_content">
        <h1> {t("DELETE_ACCOUNT_SUCCESS__TITLE")}</h1>
        <p> {t("DELETE_ACCOUNT_SUCCESS__INFO")}</p>

        <div>
          <MediaButton
            variant={MediaButtonVariant.Secondary}
            onClick={handleSignOut}
          >
            {t("DELETE_ACCOUNT_SUCCESS__BUTTON_HOME")}
          </MediaButton>
        </div>
      </div>
    </div>
  );
};
