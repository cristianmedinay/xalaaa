/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AssetEventType,
  buildAssetUploadRule,
  buildRequiredRule,
  DataProvider,
  IFormValues,
  IInsertAssetRequestModel,
  ROUTES,
  StorageService,
} from "@xala/common";
import { RcFile } from "rc-upload/lib/interface";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import { Form, FormButton, Input, LabelField, Option, Select } from "../..";
import { AssetAgeOptions } from "../../AssetAgeOptions";
import { UploadFile } from "../../UploadFile";

import "./AddAssetForm.scss";

export interface IAddAssetFormProps {
  onCloseDialog: () => void;
  onChange?: (file: RcFile) => void;
}

export const AddAssetForm: React.FC<IAddAssetFormProps> = (props) => {
  const storageService: StorageService = StorageService.getInstance();
  const history = useHistory();
  const [eventType, setEventType] = useState<string>(AssetEventType.Live);
  const [isLoading, setIsLoading] = useState(false);
  const [wrongAsset, setWrongAsset] = useState(false);
  const { t } = useTranslation();

  const onSubmit = (payload: IInsertAssetRequestModel) => {
    setIsLoading(true);
    DataProvider.createAsset(payload).then((resp) => {
      props.onCloseDialog();
      setIsLoading(false);
      history.push(`${ROUTES.MEDIA_CREATOR}/${resp.AssetId}`);
      if (payload.File) {
        storageService.uploadFile(
          payload.File,
          resp.Content.UploadInfo,
          resp.AssetId
        );
      }
    });
  };

  const onFinish = (values: IFormValues) => {
    const payload: IInsertAssetRequestModel = {
      Title: values.Title,
      AssetTypeCode: values.AssetEventType,
      AssetAgeRestrictionValueMin: values.AssetAgeRestrictionValueMin,
      File:
        values.AssetEventType !== AssetEventType.Live ? values.File : undefined,
    };
    onSubmit(payload);
  };

  const getWrongAsset = (correctAsset: boolean) => {
    setWrongAsset(correctAsset);
  };

  const updateWrongAsset = () => {
    if (wrongAsset) {
      return [buildAssetUploadRule(wrongAsset)];
    }
    return [];
  };

  useEffect(() => {
    updateWrongAsset();
  }, [wrongAsset]);

  return (
    <Form name="CreateEventForm" onFinish={onFinish}>
      <div className="add-asset-form">
        <LabelField
          name="Title"
          label={t("MEDIA_CREATOR__CREATE_EVENT__TITLE_LABEL", "Event title")}
          rules={[buildRequiredRule()]}
        >
          <Input
            className="Title"
            placeholder={t(
              "MEDIA_CREATOR__CREATE_EVENT__TITLE_PLACEHOLDER",
              "Title"
            )}
          />
        </LabelField>

        <LabelField
          name="AssetEventType"
          label={t(
            "MEDIA_CREATOR__CREATE_EVENT__SELECT_EVENT_TYPE",
            "Event type"
          )}
          rules={[buildRequiredRule("string")]}
          initialValue={eventType}
        >
          <Select<string>
            placeholder={t(
              "MEDIA_CREATOR__CREATE_EVENT__SELECT_EVENT_TYPE_PLACEHOLDER",
              "Select event type"
            )}
            onSelect={(value) => {
              setEventType(value);
            }}
          >
            {Object.keys(AssetEventType).map((type, index) => {
              // TODO: Clean this if after Movie Night type is added
              if (type !== "MovieNight") {
                return (
                  <Option
                    value={(AssetEventType as any)[type]}
                    key={index}
                    style={{ zIndex: 99999, backgroundColor: "#000000" }}
                  >
                    {t(
                      `ASSET_EVENT_${(AssetEventType as any)[type]}`,
                      ((AssetEventType as any)[type] as string).replace(
                        "_",
                        " "
                      )
                    )}
                  </Option>
                );
              }
            })}
          </Select>
        </LabelField>
        <LabelField
          name="AssetAgeRestrictionValueMin"
          label={t(
            "MEDIA_CREATOR__CREATE_EVENT__AGE_RESTRICTION_LABEL",
            "Age restriction"
          )}
          rules={[buildRequiredRule("number")]}
        >
          <AssetAgeOptions />
        </LabelField>
        {eventType !== AssetEventType.Live ? (
          <LabelField
            name="File"
            label={t(
              "MEDIA_CREATOR__CREATE_EVENT__UPLOAD_FILE_LABEL",
              "Upload file"
            )}
            rules={
              (updateWrongAsset()?.length > 0 && updateWrongAsset()) || [
                buildRequiredRule("object"),
              ]
            }
          >
            <UploadFile accept="video/*" getWrongAsset={getWrongAsset} />
          </LabelField>
        ) : null}

        <div className="text-center">
          <FormButton loading={isLoading}>
            {t("MEDIA_CREATOR__CREATE_EVENT__CREATE_BUTTON", "Create")}
          </FormButton>
        </div>
      </div>
    </Form>
  );
};
