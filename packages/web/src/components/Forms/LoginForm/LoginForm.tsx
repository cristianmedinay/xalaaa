/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ApiErrors,
  AuthStore,
  buildEmailRule,
  buildRequiredRule,
  dispatch,
  IAppState,
  IFormValues,
  ROUTES,
  StorageHelper,
  updateApiErrors,
  useAnalyticsContext,
} from "@xala/common";
import { getAnalytics, logEvent } from "firebase/analytics";
import React, { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RenderMailLink } from "helpers";

import { Form, FormButton, LabelField } from "../../Form";
import "../../Form/Form.scss";
import { Input, InputPassword } from "../../Input";
import "../AuthForm.scss";

import "./LoginForm.scss";

interface ILoginFormValues {
  Username: string;
  Password: string;
}

export const ForgotPasswordLink = () => {
  const { t } = useTranslation();

  return (
    <Link
      to={ROUTES.FORGOT_PASSWORD}
      className="text-link text-small text-underline"
    >
      <Trans>{t("FORGOT_PASSWORD__TITLE")}</Trans>
    </Link>
  );
};

export const LoginForm = () => {
  const { t } = useTranslation();

  const [isFormSent, setIsFormSent] = useState(false);
  const [apiErrors, setApiErrors] = useState<ApiErrors>({});
  const userEmail = useRef<string>();

  const authState = useSelector((state: IAppState) => state.auth);
  const locationState = useSelector(
    (state: IAppState) => state.router?.location?.state
  );
  const isUserUnconfirmed = apiErrors.email
    ?.toString()
    .includes("EMAIL_UNCONFIRMED");

  const { loginRequest, loginResponse } = useAnalyticsContext();

  useEffect(() => {
    if (isFormSent) {
      const failureActions = [
        AuthStore.Consts.SIGN_IN_FAILURE,
        AuthStore.Consts.SIGN_IN_ANONYMOUS_FAILURE,
      ];

      const isError = failureActions.includes(authState.action?.type || "");

      if (isError) {
        loginResponse("error");
      }
    }

    if (isFormSent && authState.error) {
      setApiErrors({
        email:
          typeof authState.error.Message === "string"
            ? [authState.error.Message]
            : authState.error.Message || [""],
      });
    }

    return () => {
      const successActions = [
        AuthStore.Consts.SIGN_IN_SUCCESS,
        AuthStore.Consts.SIGN_IN_ANONYMOUS_SUCCESS,
      ];

      const isSuccess = successActions.includes(authState.action?.type || "");

      if (isFormSent && isSuccess) {
        StorageHelper.getUser().then((user) => {
          loginResponse("success", user.Id);
        });
      }
    };
  }, [isFormSent, authState]);

  const handleLoginForm = (values: IFormValues) => {
    const payload: ILoginFormValues = {
      Username: values["email"],
      Password: values["password"],
    };

    loginRequest();

    const analytics = getAnalytics();
    logEvent(analytics, "login", {
      method: "email",
    });

    dispatch(AuthStore.Actions.signIn(payload));
    setIsFormSent(true);
    userEmail.current = values["email"];
  };

  const onValuesChange = (changedValues: IFormValues) => {
    const [isUpdated, newApiErrors] = updateApiErrors(apiErrors, changedValues);

    if (isUpdated) {
      setIsFormSent(false);
      setApiErrors(newApiErrors);
    }
  };

  const handleUnconfirmedUserForm = () => {
    userEmail.current &&
      dispatch(
        AuthStore.Actions.resendConfirmationEmailByUser({
          email: userEmail.current,
        })
      );
  };

  const handleErrorForm = () => {
    setApiErrors({});
  };

  const loginForm = () => (
    <Form
      className="TopForm"
      onFinish={handleLoginForm}
      onValuesChange={onValuesChange}
    >
      <h1>{t("LOGIN_LABEL")}</h1>
      <LabelField
        label={t("LOGIN__EMAIL_LABEL")}
        displayLabel={false}
        labelFor="email"
        name="email"
        rules={[buildRequiredRule(), buildEmailRule()]}
        apiErrors={apiErrors.email || []}
      >
        <Input
          className="FormInput"
          autoFocus={true}
          placeholder={t("LOGIN__EMAIL_LABEL")}
          id="email"
        />
      </LabelField>
      <LabelField
        name="password"
        rules={[buildRequiredRule()]}
        label={t("LOGIN__PASSWORD_LABEL")}
        displayLabel={false}
        labelFor="password"
      >
        <InputPassword
          id="password"
          className="FormInput"
          visibilityToggle={false}
          placeholder={t("LOGIN__PASSWORD_LABEL")}
        />
      </LabelField>
      <div className="ForgotPasswordContainer">
        <ForgotPasswordLink />
      </div>
      <div className="ButtonLine">
        <FormButton>{t("LOGIN_LABEL")}</FormButton>
      </div>
    </Form>
  );

  const unconfirmedUserForm = () => (
    <Form className="TopForm" onFinish={handleUnconfirmedUserForm}>
      <h1 className="text-upper text-center">
        {t("LOGIN_UNCONFIRMED__TITLE")}
      </h1>
      <p className="text-center text-large">
        {t("LOGIN_UNCONFIRMED__SUBTITLE")}
      </p>
      <FormButton>{t("LOGIN_UNCONFIRMED__SUBMIT")}</FormButton>
    </Form>
  );

  const errorForm = () => {
    return (
      <Form className="TopForm" onFinish={handleErrorForm}>
        <h1 className="text-upper text-center">{t("LOGIN_ERROR__TITLE")}</h1>
        <p className="text-center text-large">{t("LOGIN_ERROR__SUBTITLE")}</p>
        <Link to={ROUTES.FORGOT_PASSWORD}>
          <button
            className="TransparentButton"
            style={{ fontSize: "18px", marginBottom: "20px" }}
          >
            {t("LOGIN_ERROR__MESSAGE_1")}
          </button>
        </Link>
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
        <FormButton>{t("COMMON__BUTTON_GO_BACK")}</FormButton>
      </Form>
    );
  };

  const goToRegisterScreen = () => {
    let regiterRoute = ROUTES.REGISTER;

    if (locationState?.from) {
      const url = new URL(location.origin + locationState.from);
      const rd = url.search;
      const rdurl = `&rdurl=${url.origin}${url.pathname}`;

      if (rd && rdurl) {
        regiterRoute += rd + rdurl;
      }
    }

    return (
      <Form>
        <h1>{t("LOGIN__HINT")}</h1>
        <Link to={regiterRoute}>
          <button className="TransparentButton">
            {t("COMMON__BUTTON_REGISTER")}
          </button>
        </Link>
        <p>{t("LOGIN__DESCRIPTION")}</p>
      </Form>
    );
  };

  return (
    <div className="LoginForm AuthForm">
      {isUserUnconfirmed
        ? unconfirmedUserForm()
        : apiErrors.email
        ? errorForm()
        : loginForm()}
      {goToRegisterScreen()}
    </div>
  );
};
