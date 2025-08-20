/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import {
  CellType,
  ImageHelper,
  IMediaModel,
  RouteHelper,
  TimeHelper,
} from "@xala/common";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  ButtonDeleteAccount,
  ImageWithPlaceholder,
  LoaderSpinner,
  MediaButton,
} from "components";
import EditIcon from "resources/icons/EditIcon.svg";
import resources from "resources/list";

import "./ProfileDetails.scss";

import { MediaButtonVariant } from "enums";

type DictionaryEntry = {
  Id: number;
  Name?: string;
};

export interface IProfileDetailsProps {
  isLoading?: boolean;
  fullName?: string;
  email?: string;
  dateOfBirth?: string;
  towns?: DictionaryEntry[];
  categories?: DictionaryEntry[];
  channels?: IMediaModel[];
}

export const ProfileDetails = ({
  fullName,
  email,
  dateOfBirth,
  channels,
  towns,
  categories,
  isLoading,
}: IProfileDetailsProps) => {
  const [showOverlayMenu, setShowOverlayMenu] = useState(false);

  const { t } = useTranslation();

  const handleOpenMenu = useCallback((toggle: boolean) => {
    setShowOverlayMenu(toggle);
  }, []);

  const profileTowns = towns?.map((town) => town.Name).join(", ");

  const profileCategories = categories
    ?.map((category) => category.Name)
    .join(", ");

  const profileChannels = useMemo(() => {
    return channels?.map((channel) => {
      const { Id, Title, Images } = channel;

      const image = ImageHelper.getRoundImageUrl(
        Images?.filter((image) => image.MediaId === channel.Id)
      );

      return (
        <div key={Id} className="ProfileDetails__favChannels">
          <ImageWithPlaceholder
            placeholderSrc={resources.coverPlaceholder}
            imageSrc={image}
            cellType={CellType.Round}
            imageContainerClassName="ProfileDetails__imgContainer"
            alt={Title}
          />
          <p>{Title}</p>
        </div>
      );
    });
  }, [channels]);

  return isLoading ? (
    <LoaderSpinner className="loaderSpinner" />
  ) : (
    <div className="ProfileDetails">
      <ButtonDeleteAccount
        isVisible={showOverlayMenu}
        openMenuHandler={handleOpenMenu}
      />
      <section className="ProfileDetails__section">
        <div
          onClick={() => RouteHelper.goToEditPersonalData()}
          className="ProfileDetails__editButton"
        >
          <EditIcon />
          <p>{t("PROFILE__EDIT", "Edit")}</p>
        </div>
        <p className="ProfileDetails__headerParagraph">
          {t("PROFILE__PERSONAL_DATA", "Personal data")}
        </p>
        <p className="ProfileDetails__contentTitle">
          {t("PROFILE__FULL_NAME", "Full name")}
        </p>
        <p className="ProfileDetails__contentData">{fullName}</p>
        <p className="ProfileDetails__contentTitle">
          {t("PROFILE__EMAIL", "Email")}
        </p>
        <p className="ProfileDetails__contentData">{email}</p>
        <p className="ProfileDetails__contentTitle">
          {t("PROFILE__DATE_OF_BIRTH", "Date of birth")}
        </p>
        <p className="ProfileDetails__contentData">
          {dateOfBirth ? TimeHelper.getDateKey(dateOfBirth) : ""}
        </p>
      </section>
      <div className="ProfileDetails__underline"></div>
      <section className="ProfileDetails__section">
        <div
          onClick={() => RouteHelper.goToEditFavoriteContents()}
          className="ProfileDetails__editButton"
        >
          <EditIcon />
          <p>{t("PROFILE__EDIT", "Edit")}</p>
        </div>
        <p className="ProfileDetails__headerParagraph">
          {t("PROFILE__FAVORITE_CONTENTS", "Favorite contents")}
        </p>
        <p className="ProfileDetails__contentTitle">
          {t("PROFILE__TOWN", "Town")}
        </p>
        <p className="ProfileDetails__contentData">{profileTowns}</p>
        <p className="ProfileDetails__contentTitle">
          {t("PROFILE__CHANNELS_YOU_LIKE", "Channels you like")}
        </p>
        <div className="ProfileDetails__favChannelsContainer">
          {profileChannels}
        </div>
        <p className="ProfileDetails__contentTitle">
          {t("PROFILE__CONTENT_YOU_LIKE", "Content you like")}
        </p>
        <p className="ProfileDetails__contentData">{profileCategories}</p>
        <div className="ProfileDetails__deleteButtonContainer">
          <MediaButton
            variant={MediaButtonVariant.Secondary}
            onClick={() => handleOpenMenu(true)}
          >
            {t("COMMON__BUTTON_DELETE_ACCOUNT")}
          </MediaButton>
        </div>
      </section>
    </div>
  );
};
