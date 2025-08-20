/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AssetImageType } from "@xala/common";
import Upload from "rc-upload";
import { RcFile } from "rc-upload/lib/interface";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import InfoIcon from "../../resources/icons/info-circle.svg";
import UploadIcon from "../../resources/icons/upload.svg";

import "./UploadFile.scss";

export interface IUploadProps {
  onChange?: (file: RcFile | Blob) => void;
  imageType?: AssetImageType;
  value?: any;
  accept: string | undefined;
  isIntro?: boolean;
  getWrongAsset?: (asset: boolean, imageType?: string) => void | undefined;
}

export const UploadFile = ({
  onChange,
  imageType,
  isIntro,
  value,
  accept,
  getWrongAsset,
}: IUploadProps) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState("");
  const imagePattern = /image-*/;
  const videoPattern = /video-*/;
  const checkAssetType = (file: RcFile, pattern: RegExp) => {
    if (getWrongAsset) {
      if (file.type.match(pattern)) {
        setFileName(file.name);
        getWrongAsset(false, imageType);
        return true;
      }
      setFileName("");
      getWrongAsset(true, imageType);
      return true;
    }
    return true;
  };
  const beforeUpload = (file: RcFile, pattern: RegExp) => {
    if (checkAssetType(file, pattern)) {
      onChange?.(file);
      return false;
    }
    return false;
  };
  const imageDescriptionText = useMemo(() => {
    switch (imageType) {
      case AssetImageType.Frame:
        return t(
          "UPLOAD_FILE_DESCRIPTION__FRAME",
          "It’s recommended to use a picture that’s at least 720 x 405 pixels (Ratio 16x9) and 4MB or less. Use a JPG or PNG file."
        );
      case AssetImageType.Cover:
        return t(
          "UPLOAD_FILE_DESCRIPTION__COVER",
          "It’s recommended to use a picture that’s at least 360 x 480 pixels (Ratio 3x4) and 4MB or less. Use a JPG or PNG file."
        );
      case AssetImageType.Highlights:
        return t(
          "UPLOAD_FILE_DESCRIPTION__HIGHLIGHTS",
          "It’s recommended to use a picture that’s at least 1280 x 720 pixels (Ratio 16x9) and 4MB or less. Use a JPG or PNG file."
        );
      default:
        return t(
          "UPLOAD_FILE_DESCRIPTION__DEFAULT",
          "It’s recommended to use a picture that’s at least 00 X 00 pixels (Ratio 16x9) and 4MB or less. Use a JPG or PNG file."
        );
    }
  }, [imageType]);

  const videoDescriptionText = useMemo(() => {
    if (isIntro) {
      return t(
        "UPLOAD_FILE_DESCRIPTION__VIDEO_INTRO",
        "It’s recommended that you use a video with at least HD resolution and a size of 200 MB or less. Use MP4 or another file (to be specified)."
      );
    }

    return t(
      "UPLOAD_FILE_DESCRIPTION__VIDEO_UPLOAD",
      "It’s recommended that you use a video with at least Full HD or 4K resolution and a size of 2000 MB or less. Use MP4 or another file (to be specified)."
    );
  }, [isIntro]);

  return (
    <>
      <Upload
        type="drag"
        beforeUpload={
          accept?.match(imagePattern)
            ? (file) => beforeUpload(file, imagePattern)
            : (file) => beforeUpload(file, videoPattern)
        }
        className={`upload-file-container ${imageType?.toLocaleLowerCase()}`}
        accept={accept}
      >
        {value &&
        value.type.match(imagePattern) &&
        accept?.match(imagePattern) ? (
          <div className={`preview ${imageType}`}>
            <img
              className="full-width"
              alt="preview"
              src={
                typeof value === "string" ? value : URL.createObjectURL(value)
              }
            />
          </div>
        ) : (
          <div className="upload">
            <UploadIcon />
            <p
              className={`upload-text text-center ${
                fileName ? "file-name" : ""
              }`}
            >
              {fileName && fileName}
              {!fileName &&
                !accept?.match(videoPattern) &&
                t("UPLOAD_IMAGE_LABEL", "Upload image or drag and drop")}
              {!fileName &&
                accept?.match(videoPattern) &&
                t("UPLOAD_VIDEO_LABEL", "Upload video or drag and drop")}
            </p>
          </div>
        )}
      </Upload>
      <div className="upload-additional-info">
        <span className="info-icon">
          <InfoIcon />
        </span>
        <p className="description">
          {accept?.match(videoPattern)
            ? videoDescriptionText
            : imageDescriptionText}
        </p>
      </div>
    </>
  );
};
