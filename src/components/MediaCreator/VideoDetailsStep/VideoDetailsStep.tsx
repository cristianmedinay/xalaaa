/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AssetEventType,
  buildRequiredRule,
  ContentStatus,
  DataProvider,
  IErrorModel,
  IMediaCategoryListModel,
  RecordStatus,
  RouteHelper,
  ThemeContext,
  useDataLoader,
} from "@xala/common";
import { useForm } from "rc-field-form";
import Textarea from "rc-textarea";
import "rc-time-picker/assets/index.css";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import WarningIcon from "../../../resources/icons/notification/warning.svg";
import { AssetAgeOptions } from "../../AssetAgeOptions";
import { Form, LabelField } from "../../Form";
import { Input } from "../../Input";
import { LoaderSpinner } from "../../LoaderSpinner";
import { PillType } from "../../Pill";
import { PillsDialog } from "../../PillsDialog";
import { PillsList } from "../../PillsList";
import { MediaContext } from "../MediaContext";
import { MediaFooter } from "../MediaFooter";

import loadable from "@loadable/component";

import "./VideoDetailsStep.scss";

const ReactPlayer = loadable(() => import("react-player"));
const DatePickerWithHours = loadable(
  () => import("../../DatePickerWithHours"),
  {
    resolveComponent: (module) => module.DatePickerWithHours,
  }
);

export interface IVideoDetailsStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

export const VideoDetailsStep: React.FC<IVideoDetailsStepProps> = (props) => {
  const { t } = useTranslation();
  const media = useContext(MediaContext);
  const theme = useContext(ThemeContext);
  const [availableDateErrors, setAvailableDateErrors] = useState<string[]>([]);
  const [eventDateErrors, setEventDateErrors] = useState<string[]>([]);

  const [form] = useForm();
  const { data: categories } = useDataLoader<
    IMediaCategoryListModel,
    IErrorModel
  >({
    loader: () =>
      DataProvider.getMediaCategories().then((data) => ({
        ok: true,
        data,
      })),
    deps: [],
  });

  const runValidation = (values: any) => {
    return datesValidator(values);
  };

  const datesValidator = (values: any) => {
    const startDateTimeISO = values.StartDate;
    const endDateTimeISO = values.EndDate;
    const availableFromISO = values.AvailableDateFrom;

    const startDate = startDateTimeISO ? new Date(startDateTimeISO) : undefined;
    const endDate = endDateTimeISO ? new Date(endDateTimeISO) : undefined;
    const availableFrom = availableFromISO
      ? new Date(availableFromISO)
      : undefined;

    const eventErrors = [];
    const availabilityErrors = [];
    const now = new Date(Date.now());

    if (startDate && availableFrom) {
      //Check if availible date is set before start date
      if (availableFrom.getTime() >= startDate.getTime()) {
        availabilityErrors.push(
          t("VALIDATION__AVAILABILITY_STARTS_AT_START_DATE")
        );
      }
    }
    if (startDate && endDate) {
      // Check if start date is after or equal to end date
      if (startDate.getTime() > endDate.getTime()) {
        eventErrors.push(t("VALIDATION__START_DATE_AFTER_END_DATE"));
      }
      if (startDate.getTime() === endDate.getTime()) {
        eventErrors.push(t("VALIDATION__START_DATE_IS_EQUAL_TO_END_DATE"));
      }
      // Check if start date or end date is not in the past
      if (
        startDate.getTime() <= now.getTime() ||
        endDate.getTime() <= now.getTime()
      ) {
        eventErrors.push(t("VALIDATION__DATE_SET_IN_THE_PAST"));
      }
    }

    setEventDateErrors(eventErrors);
    setAvailableDateErrors(availabilityErrors);

    if (eventErrors.length > 0 || availabilityErrors.length > 0) {
      return Promise.reject([...eventErrors, ...availabilityErrors]);
    } else {
      return Promise.resolve();
    }
  };

  const onSubmit = (payload: any) => {
    // if(availableDateErrors.length === 0 && eventDateErrors.length === 0) {
    DataProvider.updateAsset(payload).then(() => {
      media.onReload();
      props.nextStep();
    });
    // }
  };

  const prepareCategories = (selectedCategories: { id: number }[]) => {
    const selected = categories?.Entities?.filter((category) =>
      selectedCategories.map((item) => item.id).includes(category.CategoryId)
    );
    const selectedIds = selected?.map((c) => c.CategoryId);
    const oldIds = media.data.Categories?.map(
      (category) => category.AssetCategoryId
    );
    const newCategories = selected
      ? selected
          .map((category) => {
            if (oldIds && oldIds?.includes(category.CategoryId)) {
              return undefined;
            }
            return {
              AssetId: media.data.Id,
              AssetCategoryId: category.CategoryId,
              AssetCategoryCode: category.CategoryCode,
              AssetCategoryName: category.CategoryName,
              RecordStatus: RecordStatus.Inserted,
            };
          })
          .filter((item) => item !== undefined)
      : [];

    const updatedCategories = media.data.Categories
      ? media.data.Categories.map((category) => {
          if (
            category.AssetCategoryId &&
            selectedIds?.includes(category.AssetCategoryId)
          ) {
            return {
              ...category,
              RecordStatus: RecordStatus.Updated,
            };
          } else {
            return {
              ...category,
              RecordStatus: RecordStatus.Deleted,
            };
          }
        }).filter((item) => item !== undefined)
      : [];

    return [...updatedCategories, ...newCategories];
  };

  const onFinish = (values: any) => {
    const payload = {
      ...media.data,
      Guid: media.data.Guid,
      Title: values.Title,
      Description: values.Description,
      AssetAgeRestrictionValueMin: values.AgeRestriction,
      StartDateTime: values.StartDate,
      Categories: prepareCategories(values.Categories),
      EndDateTime: values.EndDate,
      AvailableFrom: values.AvailableDateFrom,
      AvailableTo: values.AvailableDateTo,
      RecordStatus: RecordStatus.Updated,
      Payment: {
        IsPremium: false,
      },
    };

    return onSubmit(payload);
  };

  const pillsInitialValue: PillType[] = media.data.Categories
    ? media.data.Categories.map((category) => {
        return {
          id: category.AssetCategoryId!,
          title: category.AssetCategoryName!,
        };
      })
    : [];

  if ((media.data.AssetTypeCode as string) !== AssetEventType.Live) {
    // Create interval to check file upload status
    let intervalId = null;
    if (
      intervalId &&
      media.data.Contents &&
      media.data.Contents.length > 0 &&
      media.data.Contents[0].ContentStatusCode !== ContentStatus.Ready
    ) {
      intervalId = setInterval(() => {
        media.onReload();
      }, 5000);
    } else if (
      media.data.Contents &&
      media.data.Contents.length > 0 &&
      media.data.Contents[0].ContentStatusCode === ContentStatus.Ready
    ) {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }

  const renderCategoriesList = () => {
    const dialogContent = (
      add: (...val: PillType[]) => void,
      closeModal: () => void
    ) => {
      const selectedValues = form.getFieldValue("Categories");
      const pillsList = categories!.Entities.map(
        ({ CategoryName, CategoryId }) =>
          ({ title: CategoryName, id: CategoryId } as PillType)
      ).filter((pill) => {
        return !(selectedValues as any[]).find((v) => v.id === pill.id);
      });

      const onDialogSubmit = (selectedItems: PillType[]) => {
        selectedItems.forEach((val) => add(val));
        closeModal();
      };

      return (
        <PillsDialog
          header={t("EDIT__EVENT_ADD_CATEGORIES", "Choose categories")}
          onDialogSubmit={onDialogSubmit}
          pillsList={pillsList}
        />
      );
    };

    return (
      <PillsList
        listName="Categories"
        label={t("CATEGORIES", "Categories")}
        form={form}
        dialogContent={dialogContent}
        initialValue={pillsInitialValue}
      />
    );
  };

  const renderAgeRestriction = () => {
    return (
      <LabelField
        initialValue={media.data.AssetAgeRestrictionValueMin}
        name="AgeRestriction"
        label={t(
          "EDIT__EVENT_AGE_RESTRICTION",
          "Select the correct age classification"
        )}
        requiredIcon={true}
      >
        <AssetAgeOptions
          defaultValue={media.data.AssetAgeRestrictionValueMin}
        />
      </LabelField>
    );
  };

  const renderPreview = () => {
    return (
      <div className="video-details-section__video-preview">
        <div className="preview-section">
          <div
            className={`preview-container ${
              media.data.Contents?.[0].ContentStatusCode === ContentStatus.Ready
                ? "preview-container__hide"
                : ""
            }`}
          >
            {media.data.Contents?.[0].ContentStatusCode ===
              ContentStatus.Processing && (
              <div className="loader-container">
                <LoaderSpinner
                  color={theme.themeProvider.getBranding().AppPrimaryColor}
                />
                <h4>
                  {t(
                    "MEDIA_CREATOR__VIDEO_DETAILS__VIDEO_UPLOADING",
                    "Uploading.."
                  )}
                </h4>
              </div>
            )}

            {media.data.Contents?.[0].ContentStatusCode ===
              ContentStatus.Queued && (
              <div className="loader-container">
                <LoaderSpinner
                  color={theme.themeProvider.getBranding().AppPrimaryColor}
                />
                <h4>
                  {t(
                    "MEDIA_CREATOR__VIDEO_DETAILS__VIDEO_PROCESSING",
                    "Processing..."
                  )}
                </h4>
              </div>
            )}
            {media.data.Contents?.[0].ContentStatusCode ===
              ContentStatus.Ready && (
              <div className="player-container">
                <ReactPlayer url={media.data.Contents?.[0].Url} />
              </div>
            )}
          </div>
          {renderAgeRestriction()}
        </div>
      </div>
    );
  };

  return (
    <Form
      className="media-creator-form"
      name="MediaCreatorForm"
      onFinish={(values) => {
        runValidation(values).then(() => {
          onFinish(values);
        });
      }}
      onValuesChange={(changedValues, values) => {
        let AvailableDateToUpdatedValue = changedValues["EndDate"];
        let AvailableTimeToUpdatedValue = changedValues["EndTime"];

        if (changedValues["EndDate"] && !changedValues["EndTime"]) {
          if (values["EndTime"]) {
            AvailableTimeToUpdatedValue = values["EndTime"];
          } else {
            AvailableTimeToUpdatedValue = changedValues["EndDate"];
          }
        } else if (!changedValues["EndDate"] && changedValues["EndTime"]) {
          if (values["EndDate"]) {
            AvailableDateToUpdatedValue = values["EndDate"];
          } else {
            AvailableDateToUpdatedValue = new Date(Date.now());
          }
        } else if (!changedValues["EndDate"] && !changedValues["EndTime"]) {
          AvailableDateToUpdatedValue = values["EndDate"];
          AvailableTimeToUpdatedValue = values["EndTime"];
        }
        const updateFields = {
          AvailableDateTo: AvailableDateToUpdatedValue,
          AvailableTimeTo: AvailableTimeToUpdatedValue,
        };

        form.setFieldsValue(updateFields);
        runValidation(values);
      }}
      form={form}
    >
      <div className="video-details-section">
        <div className="video-details-section__form">
          <h1>{t("MEDIA_CREATOR__VIDEO_DETAILS", "VIDEO DETAILS")}</h1>

          <LabelField
            initialValue={media.data.Title}
            name="Title"
            label={t("EDIT__EVENT_TITLE", "Event Title")}
            rules={[buildRequiredRule()]}
            requiredIcon={true}
          >
            <Input
              className="FormInput Title "
              placeholder={t(
                "MEDIA_CREATOR__VIDEO_DETAILS__TITLE_PLACEHOLDER",
                "New event title"
              )}
            />
          </LabelField>

          <LabelField
            initialValue={media.data.Description}
            name="Description"
            label={t("EDIT__EVENT_DESCRIPTION", "Description")}
            rules={[buildRequiredRule()]}
            requiredIcon={true}
          >
            <div className="Description">
              <Textarea
                defaultValue={media.data.Description}
                autoSize={{ minRows: 4, maxRows: 4 }}
                className="FormInput"
                placeholder={t(
                  "MEDIA_CREATOR__VIDEO_DETAILS__DESCRIPTION_PLACEHOLDER",
                  "Ex: topics, schedule ect."
                )}
              />
            </div>
          </LabelField>

          {/* RENDER CATEGORIES */}
          {categories ? renderCategoriesList() : null}

          {/* RENDER AGE RESTRICTION */}
          {(media.data.AssetTypeCode as string) === AssetEventType.Live
            ? renderAgeRestriction()
            : null}

          <div className="broadcast-date-time-section">
            <DatePickerWithHours
              initialValue={
                media.data.StartDateTime ? media.data.StartDateTime : undefined
              }
              dateName="StartDate"
              timeName="StartTime"
              form={form}
              errors={eventDateErrors}
              label={t(
                "EDIT__EVENT_DATE_START",
                "Video broadcast start date and time:"
              )}
              rulesDate={[buildRequiredRule("string")]}
              calendarPopperPosition="top"
              requiredIcon={true}
            />

            <DatePickerWithHours
              initialValue={
                media.data.EndDateTime ? media.data.EndDateTime : undefined
              }
              dateName="EndDate"
              timeName="EndTime"
              form={form}
              label={t(
                "EDIT__EVENT_DATE_END",
                "Video broadcast end date and time:"
              )}
              rulesDate={[buildRequiredRule("string")]}
              calendarPopperPosition="top"
              requiredIcon={true}
            />
          </div>

          <div className="broadcast-date-time-section">
            <DatePickerWithHours
              dateName="AvailableDateFrom"
              timeName="AvailableTimeFrom"
              form={form}
              errors={availableDateErrors}
              label={t(
                "EDIT__EVENT_AVAILABLE_FROM",
                "Available from date and time:"
              )}
              rulesDate={[buildRequiredRule("string")]}
              calendarPopperPosition="top"
              requiredIcon={true}
            />

            <div className="available-to-container">
              <DatePickerWithHours
                initialValue={
                  media.data.AvailableTo ? media.data.AvailableTo : undefined
                }
                dateName="AvailableDateTo"
                timeName="AvailableTimeTo"
                form={form}
                label={t(
                  "EDIT__EVENT_AVAILABLE_TO",
                  "Available to date and time:"
                )}
                calendarPopperPosition="top"
                disabled
              />
              <div className="available-to-info">
                <WarningIcon />
                {t(
                  "MEDIA_CREATOR__VIDEO_DETAILS__AVAILABLE_TO_ENDS_ON_END_DATE_INFO",
                  "Event availability ends at the end date"
                )}
              </div>
            </div>
          </div>
        </div>

        {(media.data.AssetTypeCode as string) !== AssetEventType.Live
          ? renderPreview()
          : null}
      </div>
      <MediaFooter goBack={RouteHelper.goBack} type="submit" />
    </Form>
  );
};
