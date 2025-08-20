/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ApiErrors,
  AuthStore,
  IAppState,
  IFormValues,
  IRegisterRequestEmailModel,
  IUserSettingsModel,
  MediaStore,
  RegistrationSteps,
  RouteHelper,
  ROUTES,
  TimeHelper,
  updateApiErrors,
  useAnalyticsContext,
  useRouteQueryParams,
  UserStore,
} from "@xala/common";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Button, Message } from "components";

import { RegisterError } from "./RegisterError";
import { RegisterStepOneForm } from "./RegisterStepOneForm";
import { RegisterStepTwoForm } from "./RegisterStepTwoForm";

interface IRegisterFormProps {
  initialValues?: IFormValues;
  isEditScreen?: boolean;
}

interface IFavoriteType {
  Name?: string;
  Id: number;
}

type consentsStatesType = { [id: string]: boolean };

export type RegistrationProcessState = {
  type: RegistrationSteps;
  error?: boolean;
  data?: IFormValues;
};

const DEFAULT_DOMAIN_NAME = "laxarxames.cat";

export const RegisterForm = ({
  isEditScreen,
  initialValues = {},
}: IRegisterFormProps) => {
  const [consentsStates, setConsentsStates] = useState<consentsStatesType>({});
  const [isFormSent, setIsFormSent] = useState(false);
  const [apiErrors, setApiErrors] = useState<ApiErrors>({});

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const authState = useSelector((state: IAppState) => state.auth);
  const userConsents = useSelector(
    (state: IAppState) => state.user.consents.Data,
    shallowEqual
  );
  const userActionType = useSelector(
    (state: IAppState) => state.user.action?.type
  );
  const userSettings = useSelector((state: IAppState) => state.user.settings);
  const [state, setState] = useState<RegistrationProcessState>({
    type: isEditScreen ? RegistrationSteps.Two : RegistrationSteps.One,
    error: false,
    data: { ...initialValues, ...userSettings },
  });

  const initialEditValues = {
    town: state.data?.Towns?.[0].Id,
    channels: state.data?.Channels?.map((Channel: IFavoriteType) => Channel.Id),
    favourite: state.data?.Categories?.map(
      (Category: IFavoriteType) => Category.Id
    ),
  };

  const { register, profileUpdate } = useAnalyticsContext();

  const queryParams = useRouteQueryParams<{
    rd: string;
    id: string;
    rdurl: string;
  }>();

  useEffect(() => {
    dispatch(UserStore.Actions.getUserConsents());
    dispatch(MediaStore.Actions.getMediaCategories());
    dispatch(UserStore.Actions.getTowns());
    dispatch(
      MediaStore.Actions.searchMedia({
        PageNumber: 1,
        PageSize: 30,
        IncludeImages: true,
        Types: ["CHANNEL"],
      })
    );
  }, [dispatch]);

  useEffect(() => {
    switch (userActionType) {
      case UserStore.Consts.UPDATE_USER_SETTINGS_SUCCESS:
        Message.success(t("MESSAGE__SAVE_SUCCESS", "Successfully saved"));
        RouteHelper.goToProfile();
        break;
      case UserStore.Consts.UPDATE_USER_SETTINGS_FAILURE:
        Message.error(t("MESSAGE__SAVE_ERROR", "Error during save"));
        RouteHelper.goToProfile();
        break;
    }
  }, [t, userActionType]);

  useEffect(() => {
    if (authState.action?.type === AuthStore.Consts.REGISTER_EMAIL_FAILURE) {
      setState((prev) => {
        return { ...prev, type: RegistrationSteps.Error };
      });
    }
  }, [authState.action?.type]);

  useEffect(() => {
    if (isFormSent && authState.error !== apiErrors) {
      setApiErrors({ ...(authState.error as ApiErrors) });
    }

    if (userConsents && Object.keys(consentsStates).length === 0) {
      setConsentsStates(
        Object.assign(
          {},
          ...userConsents
            .filter((consent) => consent.ConsentRequired)
            .map((consent) => ({ [`${consent.ConsentId}`]: false }))
        )
      );
    }
  }, [authState.error, userConsents, apiErrors, isFormSent]);

  const handleValuesChange = (changedValues: IFormValues) => {
    const [isUpdated, newApiErrors] = updateApiErrors(apiErrors, changedValues);

    if (isUpdated) {
      setIsFormSent(false);
      setApiErrors(newApiErrors);
    } else {
      const inputErrors: ApiErrors = { ...newApiErrors };

      if (changedValues.favourite?.length > 5)
        inputErrors.Favourite = [
          `${t("REGISTER__ERROR_SELECT_FAVOURITE", { number: 5 })}`,
        ];
      else if (changedValues.favourite?.length <= 5)
        delete inputErrors.Favourite;

      if (changedValues.channels?.length > 2)
        inputErrors.Channels = [
          `${t("REGISTER__ERROR_SELECT_CHANNEL", { number: 2 })}`,
        ];
      else if (changedValues.channels?.length <= 2) delete inputErrors.Channels;

      setApiErrors(inputErrors);
    }
  };

  const submitFirstState = (values: IFormValues) => {
    if (state.type !== RegistrationSteps.One)
      throw new Error(`Invalid State: ${state}`);

    try {
      userConsents &&
        setConsentsStates(
          Object.assign(
            {},
            ...userConsents
              .filter((consent) => consent.ConsentRequired)
              .map((consent) => ({ [`${consent.ConsentId}`]: true }))
          )
        );

      setState({ type: RegistrationSteps.Two, error: false, data: values });
    } catch (error: unknown) {
      setState({ ...state, error: true });
    }
  };
  const submitEditProfile = (values: IFormValues) => {
    if (state.data) {
      const payload: IUserSettingsModel = {
        ...state.data,
        UserId: state.data.UserId,
        LanguageId: state.data?.LanguageId,
        LanguageName: state.data?.LanguageName,
        Channels: values["channels"]
          ? values["channels"].map((channel: string) => {
              return { Id: channel };
            })
          : [],
        Categories: values["favourite"]
          ? values["favourite"].map((category: string) => {
              return { Id: category };
            })
          : [],
        Towns: [{ Id: +values["town"] }],
      };
      profileUpdate();
      dispatch(UserStore.Actions.updateUserSettings(payload));
      Message.info("Sent");
    } else {
      return null;
    }
  };

  const submitSecondState = (values: IFormValues) => {
    if (state.type !== "STEP_TWO") throw new Error(`Invalid State: ${state}`);

    try {
      const requiredConsents = userConsents?.filter(
        ({ ConsentRequired }) => ConsentRequired
      );

      const keys = Object.keys(consentsStates);

      const consentsForRegistration = requiredConsents
        ?.filter((consent) => keys.includes(`${consent.ConsentId}`))
        .map((consent) => ({
          ...consent,
          Accepted: true,
          AcceptedVersion: consent.ConsentVersion,
        }));

      const domainName = queryParams.rd || DEFAULT_DOMAIN_NAME;
      const redirectUrl = queryParams.rdurl;

      const fullData = { ...state.data, ...values };
      const fullDate = `${fullData["date-day"]} ${fullData["date-month"]} ${fullData["date-year"]}`;
      const dateOfBirth =
        !fullData["date-day"] ||
        !fullData["date-month"] ||
        !fullData["date-year"]
          ? undefined
          : TimeHelper.getDate(fullDate).toISOString();

      const firstChannel =
        typeof fullData["channels"]?.[0] === "number"
          ? fullData["channels"]?.[0]
          : fullData["channels"]?.[0]?.value;

      const payload: IRegisterRequestEmailModel = {
        FullName: `${fullData["name"]} ${fullData["surname"]}`,
        Name: fullData["name"],
        Surname: fullData["surname"],
        Email: fullData["email"],
        Password: fullData["password"],
        DateOfBirth: dateOfBirth,
        Consents: consentsForRegistration,
        LiveChannelId1: firstChannel,
        LiveChannelId2: fullData["channels"]?.[1],
        CategoryId1: fullData["favourite"]?.[0],
        CategoryId2: fullData["favourite"]?.[1],
        CategoryId3: fullData["favourite"]?.[2],
        CategoryId4: fullData["favourite"]?.[3],
        CategoryId5: fullData["favourite"]?.[4],
        TownId1: fullData["town"],
        PreferredLanguageCode: i18n.language,
        Origin: domainName,
        OriginRedirectUrl: redirectUrl,
      };

      setState({ ...state, error: false, data: fullData });

      register();

      return dispatch(
        AuthStore.Actions.registerEmail(payload, ROUTES.REGISTER_SUCCESS)
      );
    } catch (error: unknown) {
      console.error(error);
      setState({ ...state, error: true });
    }
  };

  return (
    <div className="RegisterForm">
      {!isEditScreen && state.type !== RegistrationSteps.Error && (
        <h1 className="RegisterForm__title">{t("REGISTER__TITLE")}</h1>
      )}
      {state.type === RegistrationSteps.One && (
        <RegisterStepOneForm
          apiErrors={apiErrors}
          onSubmit={submitFirstState}
          handleValuesChange={handleValuesChange}
          initialValues={state.data}
          initialConsents={consentsStates}
        />
      )}
      {state.type === RegistrationSteps.Two && (
        <>
          <RegisterStepTwoForm
            editScreen={isEditScreen}
            apiErrors={apiErrors}
            onSubmit={isEditScreen ? submitEditProfile : submitSecondState}
            handleValuesChange={handleValuesChange}
            initialValues={initialEditValues}
            defaultChannelId={queryParams.id}
          />
          {!isEditScreen && (
            <p
              className="RegisterForm__back"
              onClick={() =>
                setState({ ...state, type: RegistrationSteps.One })
              }
            >
              {t("REGISTER__BACK")}
            </p>
          )}
        </>
      )}
      {authState.action?.type === AuthStore.Consts.REGISTER_EMAIL_FAILURE &&
        state.type === RegistrationSteps.Error && (
          <>
            {!isEditScreen && (
              <RegisterError>
                <Button
                  buttonClassName="FormButton"
                  type="button"
                  onClick={() =>
                    setState({ ...state, type: RegistrationSteps.Two })
                  }
                >
                  {t("REGISTER__BACK")}
                </Button>
              </RegisterError>
            )}
          </>
        )}
    </div>
  );
};
