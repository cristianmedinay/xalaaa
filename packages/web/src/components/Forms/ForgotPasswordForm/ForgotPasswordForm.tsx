/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AuthStore,
  buildEmailRule,
  buildRequiredRule,
  dispatch,
  IForgotPasswordModel,
  IFormValues,
  ROUTES,
  useAnalyticsContext,
} from "@xala/common";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Form, FormButton, LabelField } from "../../Form";
import "../../Form/Form.scss";
import { Input } from "../../Input";
import "../AuthForm.scss";

import "./ForgotPasswordForm.scss";

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();

  const { requestPasswordRecovery } = useAnalyticsContext();

  const onFinish = (values: IFormValues) => {
    const payload: IForgotPasswordModel = {
      Email: values["email"],
    };

    requestPasswordRecovery();

    dispatch(AuthStore.Actions.forgotPassword(payload));
  };

  return (
    <div className="ForgotPasswordForm AuthForm">
      <Form onFinish={onFinish}>
        <h1>{t("FORGOT_PASSWORD__TITLE")}</h1>
        <p>{t("SETTINGS_PROFILE__PASSWORD_DESCRIPTION")}</p>
        <LabelField
          name="email"
          rules={[buildRequiredRule(), buildEmailRule()]}
          label={t("LOGIN__EMAIL_LABEL")}
          displayLabel={false}
          labelFor="email"
        >
          <Input
            className="FormInput"
            placeholder={t("LOGIN__EMAIL_LABEL")}
            id="email"
          />
        </LabelField>

        <div className="ButtonLine">
          <FormButton>{t("FORGOT_PASSWORD__SUBMIT")}</FormButton>
        </div>
        <div className="ForgotPasswordBackContainer">
          <Link
            to={ROUTES.LOGIN}
            className="text-center ForgotPasswordBack text-link text-small text-underline"
          >
            {t("COMMON__BUTTON_GO_BACK")}
          </Link>
        </div>
      </Form>
    </div>
  );
};
