/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AuthStore, IAppState, ROUTES } from "@xala/common";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Form } from "components/Form/Form";
import { FormButton } from "components/Form/FormButton";
import { FormLine } from "components/Form/FormLine";
import { RenderMailLink } from "helpers";

import { Button } from "../../Button";
import "../../Form/Form.scss";
import "../AuthForm.scss";

interface IForgotPasswordSuccessLocationState {
  email?: string;
}

export const ForgotPasswordSuccess = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isUserUnconfirmed =
    useSelector((state: IAppState) => state.auth.error?.MessageKey) ===
    "EMAIL_UNCONFIRMED";
  const email = useLocation<IForgotPasswordSuccessLocationState>().state?.email;

  const handleResendConfirmation = () => {
    email &&
      dispatch(
        AuthStore.Actions.resendConfirmationEmailByUser({
          email,
        })
      );
  };

  const unconfirmedUserForm = () => (
    <Form onFinish={handleResendConfirmation}>
      <h1 className="text-upper text-center">
        {t("FORGOT_PASSWORD_UNCONFIRMED__TITLE")}
      </h1>
      <p className="text-center text-large">
        {t("FORGOT_PASSWORD_UNCONFIRMED__SUBTITLE")}
      </p>
      <FormLine />
      <FormButton>{t("FORGOT_PASSWORD_UNCONFIRMED__SUBMIT")}</FormButton>
    </Form>
  );

  const successForm = () => (
    <div className="form">
      <h1 className="text-center">{t("FORGOT_PASSWORD_SUCCESS__TITLE")}</h1>
      <p className="text-center text-normal">
        {t("FORGOT_PASSWORD_SUCCESS__SUBTITLE")}
      </p>
      <div className="ButtonLine">
        <Link to={ROUTES.MAIN_SCREEN}>
          <Button buttonClassName="FormButton" type="button">
            {t("FORGOT_PASSWORD_SUCCESS__CONFIRM")}
          </Button>
        </Link>
      </div>
      <p className="text-center ForgotPasswordSuccessParagraph">
        {t("FORGOT_PASSWORD_SUCCESS__MESSAGE_1")}
      </p>
      <p className="text-center text-normal">
        {
          <Trans
            i18nKey={t("LOGIN_ERROR__MESSAGE_2")}
            components={{
              1: <RenderMailLink />,
            }}
          />
        }
      </p>
    </div>
  );

  return (
    <div className="ForgotPasswordSuccess AuthForm">
      {isUserUnconfirmed ? unconfirmedUserForm() : successForm()}
    </div>
  );
};
