/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ApiErrors,
  AuthStore,
  buildPasswordMatchRule,
  buildPasswordMinimumRule,
  buildPasswordPatternRule,
  buildRequiredRule,
  combineApiErrors,
  IAppState,
  IFormValues,
  IResetForgotPasswordModel,
  updateApiErrors,
  UrlHelper,
  useAnalyticsContext,
  useDispatch,
  useSelector,
} from "@xala/common";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Form, FormButton, LabelField } from "../../Form";
import "../../Form/Form.scss";
import { InputPassword } from "../../Input";
import { LoaderSpinner } from "../../LoaderSpinner";
import "../AuthForm.scss";

import "./ForgotPasswordForm.scss";

interface IResetPasswordQueryParams {
  email?: string;
  token?: string;
}

export const ResetPasswordForm = ({ ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isFormSent, setIsFormSent] = useState(false);
  const [apiErrors, setApiErrors] = useState<ApiErrors>({});

  const authState = useSelector((state: IAppState) => state.auth);

  const isTokenValid = authState.isTokenValid;

  const queryParams = UrlHelper.parse(
    props.location.search
  ) as IResetPasswordQueryParams;

  const { changePassword } = useAnalyticsContext();

  useEffect(() => {
    if (isFormSent && authState.error) {
      if (!("Password" in authState.error)) {
        setApiErrors({
          confirm_password: combineApiErrors(authState.error),
        });
      } else {
        setApiErrors(authState.error);
      }
    }
  }, [authState.error, isFormSent]);

  useEffect(() => {
    dispatch(AuthStore.Actions.validateToken(queryParams.token || ""));
  }, [queryParams.token]);

  const onFinish = (values: IFormValues) => {
    const payload: IResetForgotPasswordModel = {
      Email: queryParams.email || "",
      Password: values["password"],
      Token: queryParams.token || "",
    };

    setIsFormSent(true);

    changePassword();

    return dispatch(AuthStore.Actions.resetForgotPassword(payload));
  };

  const onValuesChange = (changedValues: IFormValues) => {
    const [isUpdated, newApiErrors] = updateApiErrors(apiErrors, changedValues);

    if (isUpdated) {
      setIsFormSent(false);
      setApiErrors(newApiErrors);
    }
  };
  const renderForm = () => {
    return (
      <Form onFinish={onFinish} onValuesChange={onValuesChange}>
        <h1>{t("RESET_PASSWORD__TITLE", "Reset password")}</h1>
        <p>
          {t(
            "RESET_PASSWORD__SUBTITLE",
            "Please enter your requested data below to proceed with recovering/resetting your password."
          )}
        </p>

        <LabelField
          name="password"
          rules={[
            buildRequiredRule(),
            buildPasswordMinimumRule(),
            buildPasswordPatternRule(),
          ]}
          apiErrors={apiErrors.Password || []}
        >
          <InputPassword
            className="FormInput"
            visibilityToggle={false}
            placeholder={t("RESET_PASSWORD__PASSWORD_LABEL", "Password")}
          />
        </LabelField>

        <LabelField
          name="confirm_password"
          dependencies={["password"]}
          rules={[
            buildRequiredRule(),
            (context) => buildPasswordMatchRule(context, "password"),
          ]}
          apiErrors={apiErrors.confirm_password || []}
        >
          <InputPassword
            className="FormInput"
            visibilityToggle={false}
            placeholder={t(
              "RESET_PASSWORD__RE_PASSWORD_LABEL",
              "Re-enter password"
            )}
          />
        </LabelField>

        <div className="ButtonLine">
          <FormButton>{t("RESET_PASSWORD__SUBMIT", "Reset")}</FormButton>
        </div>
      </Form>
    );
  };

  const renderError = () => {
    return (
      <div className="form" style={{ minHeight: "164px" }}>
        <h1 className="text-upper text-center">
          {t("RESET_PASSWORD__TOKEN_EXPIRED", "The token has expired")}
        </h1>
      </div>
    );
  };

  const renderLoader = () => {
    return (
      <div
        className="form"
        style={{
          width: "fit-content",
        }}
      >
        <LoaderSpinner />
      </div>
    );
  };

  return (
    <div className="ResetForgotPasswordForm AuthForm">
      {isTokenValid === undefined
        ? renderLoader()
        : isTokenValid
        ? renderForm()
        : renderError()}
    </div>
  );
};
