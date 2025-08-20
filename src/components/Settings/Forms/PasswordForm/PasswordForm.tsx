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
  dispatch,
  IAppState,
  IChangePasswordModel,
  IFormValues,
  RouteHelper,
  useAnalyticsContext,
} from "@xala/common";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import {
  Form,
  FormButton,
  InputPassword,
  LabelField,
  Message,
} from "components";

import "./PasswordForm.scss";

export const PasswordForm = () => {
  const [apiErrors, setApiErrors] = useState<ApiErrors>({});

  const { t } = useTranslation();
  const { changePassword } = useAnalyticsContext();

  const action = useSelector((state: IAppState) => state.auth.action);

  useEffect(() => {
    switch (action?.type) {
      case AuthStore.Consts.CHANGE_PASSWORD_SUCCESS:
        changePassword();
        Message.success(t("MESSAGE__SAVE_SUCCESS", "Successfully saved"));
        RouteHelper.goToProfile();
        break;
      case AuthStore.Consts.CHANGE_PASSWORD_FAILURE:
        if (action.error?.MessageKey === "CHANGE_PASSWORD_ERROR") {
          return Message.error(
            t("MESSAGE__INCORRECT_OLD_PASSWORD", "Incorrect old password")
          );
        }
        Message.error(t("MESSAGE__SAVE_ERROR", "Error during save"));
        RouteHelper.goToProfile();
        break;
    }
  }, [action]);

  const onFinish = (values: IFormValues) => {
    const payload: IChangePasswordModel = {
      OldPassword: values["old_password"],
      NewPassword: values["password"],
      ConfirmPassword: values["confirm_password"],
    };
    dispatch(AuthStore.Actions.changePassword(payload));
    setTimeout(() => {
      Message.info("Sent");
    }, 350);
  };

  const onValuesChange = (changedValues: IFormValues, _: IFormValues) => {
    for (const field in changedValues) {
      if (field in apiErrors) {
        const newApiErrors = { ...apiErrors };
        delete newApiErrors[field];
        setApiErrors(newApiErrors);
      }
    }
  };

  return (
    <div className="PasswordForm">
      <Form onFinish={onFinish} onValuesChange={onValuesChange}>
        <LabelField
          name="old_password"
          label={t("PASSWORD_FORM__CURRENT_PASSWORD_LABEL", "Old password")}
          rules={[
            buildRequiredRule(),
            buildPasswordMinimumRule(),
            buildPasswordPatternRule(),
          ]}
          apiErrors={apiErrors.name || []}
        >
          <InputPassword
            className="FormInput"
            visibilityToggle={false}
            placeholder={t(
              "PASSWORD_FORM__CURRENT_PASSWORD_PLACEHOLDER",
              "Enter your current password"
            )}
          />
        </LabelField>

        <LabelField
          name="password"
          label={t("PASSWORD_FORM__NEW_PASSWORD_LABEL", "New password")}
          rules={[
            buildRequiredRule(),
            buildPasswordMinimumRule(),
            buildPasswordPatternRule(),
          ]}
          apiErrors={apiErrors.name || []}
        >
          <InputPassword
            className="FormInput"
            visibilityToggle={false}
            placeholder={t(
              "PASSWORD_FORM__NEW_PASSWORD_PLACEHOLDER",
              "At least 8 characters"
            )}
          />
        </LabelField>

        <LabelField
          name="confirm_password"
          label={t(
            "PASSWORD_FORM__CONFIRM_NEW_PASSWORD_LABEL",
            "Repeat new password"
          )}
          dependencies={["password"]}
          rules={[
            buildRequiredRule(),
            (context) => buildPasswordMatchRule(context, "password"),
          ]}
          apiErrors={apiErrors.name || []}
        >
          <InputPassword
            className="FormInput"
            visibilityToggle={false}
            placeholder={t(
              "PASSWORD_FORM__CONFIRM_NEW_PASSWORD_PLACEHOLDER",
              "At least 8 characters"
            )}
          />
        </LabelField>

        <div className="ButtonLine">
          <FormButton>
            {t("PASSWORD_FORM__SUBMIT", "Change password")}
          </FormButton>
        </div>
      </Form>
    </div>
  );
};
