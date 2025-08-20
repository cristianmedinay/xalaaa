/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AssetContentType,
  buildAssetUploadRule,
  ContentStatus,
  DataProvider,
  IAssetContentModel,
  IFormValues,
  RecordStatus,
  StorageService,
  StreamType,
} from "@xala/common";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { Form, LabelField } from "../..";
import { UploadFile } from "../../UploadFile";
import { MediaContext } from "../MediaContext";
import { MediaFooter } from "../MediaFooter";

import "./IntroStep.scss";

export interface IIntroStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

export const IntroStep: React.FC<IIntroStepProps> = (props) => {
  const { t } = useTranslation();
  const media = useContext(MediaContext);
  const [wrongAsset, setWrongAsset] = useState(false);
  const storageService: StorageService = StorageService.getInstance();

  const findContent = (type: StreamType) =>
    media.data.Contents?.find((item: IAssetContentModel) => {
      if (item.StreamTypeCode === type) {
        return item;
      }
    });

  const onSubmit = async (file: File) => {
    const intro = findContent(StreamType.Trial);
    if (file) {
      if (intro) {
        const payload: IAssetContentModel = {
          AssetId: media.data.Id,
          StreamTypeCode: "TRIAL",
          Id: intro.Id,
          ContentTypeCode: AssetContentType.HLS,
          ContentStatusCode: ContentStatus.Queued,
          RecordStatus: RecordStatus.Updated,
          RowVersion: intro.RowVersion,
        };
        const assetContent = await DataProvider.updateAssetContent(payload);
        if (assetContent?.UploadInfo) {
          storageService.uploadFile(
            file,
            assetContent.UploadInfo,
            assetContent.UploadInfo.Key
          );
        }
      } else {
        const payload: IAssetContentModel = {
          AssetId: media.data.Id,
          StreamTypeCode: "TRIAL",
          Id: -1,
          ContentTypeCode: AssetContentType.HLS,
          ContentStatusCode: ContentStatus.Queued,
          RecordStatus: RecordStatus.Inserted,
        };
        const assetContent = await DataProvider.addAssetContent(payload);
        if (assetContent?.UploadInfo) {
          storageService.uploadFile(
            file,
            assetContent.UploadInfo,
            assetContent.UploadInfo.Key
          );
        }
      }
    }

    media.onReload();
    props.nextStep();
  };

  const onFinish = (values: IFormValues) => {
    onSubmit(values.File);
  };

  const goBack = () => {
    media.onReload();
    props.previousStep();
  };
  const getWrongAsset = (correctAsset: boolean) => {
    setWrongAsset(correctAsset);
  };

  return (
    <>
      {media && (
        <Form
          className="media-images-form"
          name="MediaImagesForm"
          onFinish={onFinish}
        >
          <div className="intro-section">
            <h1>{t("MEDIA_CREATOR__INTRO", "INTRO")}</h1>
            <div className="intro-container">
              <LabelField
                name="File"
                label={t(
                  "MEDIA_CREATOR__INTRO__DESCRIPTION",
                  "Add intro to the event"
                )}
                rules={[buildAssetUploadRule(wrongAsset)]}
              >
                <UploadFile
                  accept="video/*"
                  isIntro
                  getWrongAsset={getWrongAsset}
                />
              </LabelField>
            </div>
          </div>
          <MediaFooter goBack={goBack} type="submit" />
        </Form>
      )}
    </>
  );
};
