/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AssetImageType,
  buildAssetUploadRule,
  buildRequiredRule,
  DataProvider,
  IAssetImageModel,
  IFormValues,
  PlatformType,
  RecordStatus,
  StorageService,
} from "@xala/common";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { Form, LabelField } from "../..";
import { UploadFile } from "../../UploadFile";
import { MediaContext } from "../MediaContext";
import { MediaFooter } from "../MediaFooter";

import "./ImagesStep.scss";

export interface IImagesStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

export const ImagesStep: React.FC<IImagesStepProps> = (props) => {
  const { t } = useTranslation();
  const media = useContext(MediaContext);
  const [wrongAssetCover, setWrongAssetCover] = useState(false);
  const [wrongAssetFrame, setWrongAssetFrame] = useState(false);
  const [wrongAssetHighlights, setWrongAssetHighlights] = useState(false);
  const storageService: StorageService = StorageService.getInstance();

  const findImage = (type?: AssetImageType) =>
    media.data.Images?.find((item: IAssetImageModel) => {
      if (item.AssetImageTypeCode === type) {
        return item;
      }
    });

  const isImageAsset = (type: AssetImageType): boolean | undefined => {
    return media.data.Images?.some((image: IAssetImageModel) => {
      return image.AssetImageTypeCode === type;
    });
  };

  const getInsertNewImageObject = (type: AssetImageType): IAssetImageModel => ({
    AssetId: media.data.Id,
    PlatformCode: PlatformType.Any,
    PlatformDisplayName: "Any",
    AssetImageTypeCode: type,
    AssetImageTypeDisplayName: type,
    RecordStatus: RecordStatus.Inserted,
  });

  const onSubmit = (values: IFormValues) => {
    if (
      values.Cover &&
      values.Cover.type &&
      isImageAsset(AssetImageType.Cover)
    ) {
      DataProvider.updateAssetImage(findImage(AssetImageType.Cover) || {}).then(
        (resp) => {
          if (resp.UploadInfo) {
            storageService.uploadFile(values.Cover, resp.UploadInfo);
          }
        }
      );
    }

    if (
      values.Cover &&
      values.Cover.type &&
      !isImageAsset(AssetImageType.Cover)
    ) {
      DataProvider.insertAssetImage(
        getInsertNewImageObject(AssetImageType.Cover)
      ).then((resp) => {
        if (resp.UploadInfo) {
          storageService.uploadFile(values.Cover, resp.UploadInfo);
        }
      });
    }

    if (
      values.Highlights &&
      values.Highlights.type &&
      isImageAsset(AssetImageType.Highlights)
    ) {
      DataProvider.updateAssetImage(
        findImage(AssetImageType.Highlights) || {}
      ).then((resp) => {
        if (resp.UploadInfo) {
          return storageService.uploadFile(values.Highlights, resp.UploadInfo);
        }
      });
    }

    if (
      values.Highlights &&
      values.Highlights.type &&
      !isImageAsset(AssetImageType.Highlights)
    ) {
      DataProvider.insertAssetImage(
        getInsertNewImageObject(AssetImageType.Highlights)
      ).then((resp) => {
        if (resp.UploadInfo) {
          return storageService.uploadFile(values.Highlights, resp.UploadInfo);
        }
      });
    }

    if (
      values.Frame &&
      values.Frame.type &&
      isImageAsset(AssetImageType.Frame)
    ) {
      DataProvider.updateAssetImage(findImage(AssetImageType.Frame) || {}).then(
        (resp) => {
          if (resp.UploadInfo) {
            storageService.uploadFile(values.Frame, resp.UploadInfo);
          }
        }
      );
    }

    if (
      values.Frame &&
      values.Frame.type &&
      !isImageAsset(AssetImageType.Frame)
    ) {
      DataProvider.insertAssetImage(
        getInsertNewImageObject(AssetImageType.Frame)
      ).then((resp) => {
        if (resp.UploadInfo) {
          storageService.uploadFile(values.Frame, resp.UploadInfo);
        }
      });
    }
    props.nextStep();
    media.onReload();
  };

  const onFinish = (values: IFormValues) => {
    onSubmit(values);
  };

  const goBack = () => {
    media.onReload();
    props.previousStep();
  };

  const getWrongAsset = (correctAsset: boolean, assetType?: string) => {
    if (assetType) {
      switch (assetType) {
        case AssetImageType.Highlights:
          setWrongAssetHighlights(correctAsset);
          break;
        case AssetImageType.Frame:
          setWrongAssetFrame(correctAsset);
          break;
        case AssetImageType.Cover:
          setWrongAssetCover(correctAsset);
          break;
      }
    }
  };

  return (
    <>
      {media && (
        <Form
          className="media-images-form"
          name="MediaImagesForm"
          onFinish={onFinish}
        >
          <div className="images-section">
            <h1>{t("MEDIA_CREATOR__IMAGES", "Images")}</h1>
            <p>
              {t(
                "MEDIA_CREATOR__IMAGES__DESCRIPTION",
                "Select the media you want to add to the event"
              )}
            </p>
            <div className="images-container">
              <div className="image-frame">
                <LabelField
                  initialValue={findImage(AssetImageType.Frame)?.Url}
                  name="Frame"
                  label={t("MEDIA_CREATOR__IMAGES__COVER_PHOTO", "Cover photo")}
                  requiredIcon={true}
                  rules={
                    wrongAssetFrame && !findImage(AssetImageType.Frame)?.Url
                      ? [buildAssetUploadRule(wrongAssetFrame)]
                      : findImage(AssetImageType.Frame)?.Url
                      ? [buildAssetUploadRule(wrongAssetFrame)]
                      : [buildRequiredRule("object")]
                  }
                >
                  <UploadFile
                    accept="image/*"
                    imageType={AssetImageType.Frame}
                    getWrongAsset={getWrongAsset}
                  />
                </LabelField>
              </div>
              <div className="image-cover">
                <LabelField
                  initialValue={findImage(AssetImageType.Cover)?.Url}
                  name="Cover"
                  label={t(
                    "MEDIA_CREATOR__IMAGES__POSTER_PROMO",
                    "Poster promo"
                  )}
                  rules={[buildAssetUploadRule(wrongAssetCover)]}
                >
                  <UploadFile
                    accept="image/*"
                    imageType={AssetImageType.Cover}
                    getWrongAsset={getWrongAsset}
                  />
                </LabelField>
              </div>
              <div className="image-highlights">
                <LabelField
                  initialValue={findImage(AssetImageType.Highlights)?.Url}
                  name="Highlights"
                  label={t(
                    "MEDIA_CREATOR__IMAGES__BANNER_IMAGE",
                    "BannerComponent image"
                  )}
                  rules={
                    wrongAssetHighlights &&
                    !findImage(AssetImageType.Highlights)?.Url
                      ? [buildAssetUploadRule(wrongAssetHighlights)]
                      : findImage(AssetImageType.Highlights)?.Url
                      ? [buildAssetUploadRule(wrongAssetHighlights)]
                      : [buildRequiredRule("object")]
                  }
                  requiredIcon={true}
                >
                  <UploadFile
                    accept="image/*"
                    imageType={AssetImageType.Highlights}
                    getWrongAsset={getWrongAsset}
                  />
                </LabelField>
              </div>
            </div>
          </div>
          <MediaFooter goBack={goBack} type="submit" />
        </Form>
      )}
    </>
  );
};
