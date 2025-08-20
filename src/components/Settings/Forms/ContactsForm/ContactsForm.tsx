/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ApiErrors,
  buildEmailRule,
  buildNameMaxLengthRule,
  buildRequiredRule,
  dispatch,
  IAppState,
  IFormValues,
  IUserModel,
  RouteHelper,
  TimeHelper,
  useAnalyticsContext,
  UserStore,
} from "@xala/common";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import {
  Form,
  FormButton,
  Input,
  LabelField,
  Message,
  SeparateDatePicker,
} from "components";

import "./ContactsForm.scss";

export const ContactsForm = () => {
  const [apiErrors, setApiErrors] = useState<ApiErrors>({});

  const { t } = useTranslation();
  const { profileUpdate, emailValidation } = useAnalyticsContext();

  const { action: { type: userActionType } = {}, profile } = useSelector(
    (state: IAppState) => state.user
  );

  useEffect(() => {
    switch (userActionType) {
      case UserStore.Consts.UPDATE_PROFILE_SUCCESS:
        profileUpdate();
        Message.success(t("MESSAGE__SAVE_SUCCESS", "Successfully saved"));
        RouteHelper.goToProfile();
        break;
      case UserStore.Consts.UPDATE_PROFILE_FAILURE:
        emailValidation();
        Message.error(t("MESSAGE__SAVE_ERROR", "Error during save"));
        RouteHelper.goToProfile();
        break;
    }
  }, [userActionType]);

  const onFinish = (values: IFormValues) => {
    if (!profile.Data || !profile.Data?.Id) {
      return;
    }

    const payload: IUserModel = {
      ...profile.Data,
      FirstName: values["firstName"],
      Surname: values["surname"],
      FullName: `${values["firstName"]} ${values["surname"]}`,
      Email: values["email"],
    };

    if (
      values["date-day"] !== undefined &&
      values["date-month"] !== undefined &&
      values["date-year"] !== undefined
    ) {
      payload.DateOfBirth = TimeHelper.getDate(
        `${values["date-day"]} ${values["date-month"]} ${values["date-year"]}`
      )?.toISOString();
    }

    dispatch(UserStore.Actions.updateProfile(payload));

    Message.info("Sent");
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
    <div className="ContactsForm">
      <Form onFinish={onFinish} onValuesChange={onValuesChange}>
        <LabelField
          name="firstName"
          label={t("REGISTER__NAME_LABEL", "First name")}
          rules={[buildRequiredRule(), buildNameMaxLengthRule()]}
          apiErrors={apiErrors.firstName || []}
          initialValue={profile?.Data?.FirstName}
        >
          <Input className="FormInput" />
        </LabelField>
        <LabelField
          name="surname"
          label={t("CONTACTS_FORM__SURNAME_LABEL", "Surname")}
          rules={[buildRequiredRule(), buildNameMaxLengthRule()]}
          apiErrors={apiErrors.surname || []}
          initialValue={profile?.Data?.Surname}
        >
          <Input className="FormInput" />
        </LabelField>
        <LabelField
          name="email"
          label={t("CONTACTS_FORM__EMAIL_LABEL", "Your current E-mail")}
          rules={[buildRequiredRule(), buildEmailRule()]}
          apiErrors={apiErrors.email || []}
          initialValue={profile?.Data?.Email}
        >
          <Input className="FormInput" />
        </LabelField>
        <div className="RegisterForm__input">
          <SeparateDatePicker initialDate={profile.Data?.DateOfBirth} />
        </div>

        <div className="ButtonLine">
          <FormButton>{t("CONTACTS_FORM__SUBMIT", "Save changes")}</FormButton>
        </div>
      </Form>
    </div>
  );
};
