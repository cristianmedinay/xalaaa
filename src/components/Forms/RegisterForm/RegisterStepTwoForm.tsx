/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ApiErrors,
  buildRequiredRule,
  CellType,
  IAppState,
  IFormValues,
  ImageHelper,
  IMediaSearchStateModel,
  ITownsListModel,
  UserStore,
} from "@xala/common";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import {
  Form,
  FormButton,
  ImageWithPlaceholder,
  InputMultiSelect,
  InputSelect,
  LabelField,
  Option,
} from "components";
import resources from "resources/list";

interface IRegisterFormProps {
  initialValues?: IFormValues;
  onSubmit: (data: IFormValues) => void;
  handleValuesChange: (changedValues: IFormValues) => void;
  apiErrors: ApiErrors;
  editScreen?: boolean;
  data?: IFormValues;
  defaultChannelId?: string;
}

export const RegisterStepTwoForm = ({
  initialValues,
  onSubmit,
  handleValuesChange,
  apiErrors,
  editScreen,
  defaultChannelId,
}: IRegisterFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authState = useSelector((state: IAppState) => state.auth);
  const userState = useSelector((state: IAppState) => state.user.profile);
  const towns = useSelector<IAppState, ITownsListModel>(
    (state) => state.user.towns
  );

  const userTown =
    useSelector((state: IAppState) => state.user.settings.Towns)?.[0].Id ||
    null;

  const mediaCategories = useSelector(
    (state: IAppState) => state.media.mediaCategories
  );

  const mediaChannels = useSelector<IAppState, IMediaSearchStateModel>(
    (state) => state.media.mediaSearch
  );
  const [townId, setTownId] = useState<number | null>(null);
  const channels = useRef<number[]>([]);
  const channelsPrev = useRef<number[]>([]);
  const [channelsError, setChannelsError] = useState<string[]>([]);

  const mediaChannelsByTown = useSelector(
    (state: IAppState) => state.user.channels
  );

  useEffect(() => {
    if (editScreen && !townId) {
      setTownId(userTown);
    }
    if (townId !== null) {
      dispatch(UserStore.Actions.getMediaChannelsForTown(townId, false));
    }
  }, [dispatch, townId, editScreen, userTown]);

  const renderChannelItem = useCallback(({ Title, Id, Images }, index) => {
    const roundImage = ImageHelper.getRoundImageUrl(Images);
    return (
      <Option key={index} value={Id}>
        <ImageWithPlaceholder
          placeholderSrc={resources.coverPlaceholder}
          imageSrc={roundImage}
          cellType={CellType.Round}
          imageContainerClassName="RegisterForm__optionLogo"
          alt={Title}
        />
        {Title}
      </Option>
    );
  }, []);

  const channelItems = useMemo(() => {
    if (townId && (mediaChannelsByTown?.Entities?.length || 0) > 0) {
      return mediaChannelsByTown?.Entities.map(renderChannelItem) || [];
    } else if (mediaChannels?.Entities?.length > 0) {
      return mediaChannels.Entities.map(renderChannelItem);
    }
    return [];
  }, [
    mediaChannels.Entities,
    mediaChannelsByTown?.Entities,
    renderChannelItem,
    townId,
  ]);

  const renderCategoriesItems = useMemo(() => {
    const categories = mediaCategories.Entities;

    return categories?.map(({ CategoryName, CategoryId }) => (
      <Option value={CategoryId} key={CategoryId}>
        {CategoryName}
      </Option>
    ));
  }, [mediaCategories]);

  const onValuesChanged = (values: IFormValues) => {
    if (values?.channels) {
      if (channels.current !== values?.channels) {
        channelsPrev.current = channels.current;
      }
      channels.current = values?.channels;
    }

    handleValuesChange(values);
  };

  const handleLimmitChannels = () => {
    if (channels.current.length >= 2) {
      if (channelsPrev.current.length >= 2) {
        return setChannelsError([
          `${t("REGISTER__ERROR_SELECT_CHANNEL", { number: 2 })}`,
        ]);
      }

      channelsPrev.current = channels.current;
      return setChannelsError([]);
    }
    return setChannelsError([]);
  };

  if (!mediaChannels.Entities.length) {
    return null;
  }

  const initialChannel = mediaChannels.Entities?.find(
    (item) => item.Id === Number(defaultChannelId)
  );

  return (
    <Form
      className="RegisterForm__form"
      initialValues={initialValues}
      onFinish={onSubmit}
      onValuesChange={onValuesChanged}
    >
      {!editScreen && (
        <p className="RegisterForm__subTitle">{t("REGISTER__SUB_TITLE")}</p>
      )}
      <div className="RegisterForm__container">
        <LabelField
          name="town"
          label={t("REGISTER__TOWN_LABEL") + " *"}
          labelFor="town"
          rules={[buildRequiredRule("number")]}
          apiErrors={apiErrors.Town || []}
        >
          <InputSelect
            className="RegisterForm__input"
            placeholder={t("REGISTER__TOWN_PLACEHOLDER")}
            autoFocus
            optionFilterProp="children"
            setItemValue={setTownId}
            loading={towns.IsLoading}
            id="town"
          >
            {towns?.Entities.map(({ Name, Id }) => (
              <Option value={Id} key={Id}>
                {Name}
              </Option>
            ))}
          </InputSelect>
        </LabelField>
        <LabelField
          name="channels"
          label={t("REGISTER__CHANNELS_LABEL")}
          labelFor="channels"
          apiErrors={apiErrors.Channels || []}
          otherErrors={channelsError}
          initialValue={
            initialChannel && [
              {
                key: `${initialChannel.Id}`,
                value: initialChannel.Id,
                label: initialChannel.Title,
              },
            ]
          }
        >
          <InputMultiSelect
            className="RegisterForm__input"
            placeholder={t("REGISTER__CHANNELS_PLACEHOLDER")}
            optionFilterProp="children"
            loading={mediaChannelsByTown.isProcessing}
            maxCount={2}
            onClick={handleLimmitChannels}
            id="channels"
          >
            {channelItems}
          </InputMultiSelect>
        </LabelField>
        <LabelField
          name="favourite"
          label={t("REGISTER_FAVORITES_LABEL")}
          apiErrors={apiErrors.Favourite || []}
          labelFor="favourite"
        >
          <InputMultiSelect
            className="RegisterForm__input"
            placeholder={t("REGISTER__FAVORITES_PLACEHOLDER")}
            optionFilterProp="children"
            loading={mediaCategories.IsLoading}
            id="favourite"
          >
            {renderCategoriesItems}
          </InputMultiSelect>
        </LabelField>
        <div className="Error">{apiErrors.Message}</div>
        <FormButton
          disabled={!!Object.keys(apiErrors).length}
          loading={editScreen ? userState.IsProcessing : authState.isProcessing}
        >
          {editScreen ? t("CONTACTS_FORM__SUBMIT") : t("REGISTER__CREATE")}
        </FormButton>
      </div>
    </Form>
  );
};
