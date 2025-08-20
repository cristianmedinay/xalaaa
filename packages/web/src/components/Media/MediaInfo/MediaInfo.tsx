/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AssetType,
  DataProvider,
  IMediaModel,
  RouteHelper,
  TimeHelper,
} from "@xala/common";
import dayjs from "dayjs";
import React from "react";
import { WithTranslation } from "react-i18next";

import { MDUp, MediaAdditionalInfo, PlayInlineButton } from "../../";
import PlusIcon from "../../../resources/icons/Plus.svg";
import MinusIcon from "../../../resources/icons/remove.svg";

import "./MediaInfo.scss";

export interface MediaInfoStateProps {
  isProductOwnByUser: boolean;
}

export interface MediaInfoDispatchProps {}

export interface MediaInfoOwnProps {
  media: IMediaModel;
}

interface Props
  extends MediaInfoStateProps,
    MediaInfoDispatchProps,
    MediaInfoOwnProps,
    WithTranslation {}

interface State {
  isOnMyList: boolean;
}

export class MediaInfo extends React.PureComponent<Props, State> {
  state = {
    isOnMyList: false,
  };

  componentDidMount() {
    const { media } = this.props;
    DataProvider.isOnMyList(media.Id).then((isOnMyList) =>
      this.setState({ isOnMyList })
    );
  }

  private toggleMyList = () => {
    const { isOnMyList } = this.state;
    const { media } = this.props;
    if (!media?.Id) {
      return;
    }
    const togglePromise = isOnMyList
      ? DataProvider.removeFromMyList(media?.Id)
      : DataProvider.addToMyList(media?.Id);
    togglePromise.then(() => this.setState({ isOnMyList: !isOnMyList }));
  };

  render() {
    const { media, isProductOwnByUser, t } = this.props;
    const { isOnMyList } = this.state;
    const isPackage = media.MediaTypeCode === AssetType.Package;
    const title = media.Title;
    let description = "";

    if (media) {
      switch (media.MediaTypeCode) {
        case AssetType.Video:
        case AssetType.Series:
        case AssetType.Season:
        case AssetType.Episode:
          description = media.ShortDescription || "";
          break;
        case AssetType.Live:
        case AssetType.Channel:
        case AssetType.Program:
          if (media.AvailableFrom) {
            const availableFrom = dayjs(media.StartDateTime);
            description = `${availableFrom.format(
              "dddd"
            )} | ${availableFrom.format("D MMMM")} | ${availableFrom.format(
              "HH:mm"
            )}`;

            if (media.Duration) {
              description += ` - ${availableFrom
                .add(media.Duration, "second")
                .format("HH:mm")}`;
            }
          } else {
            description = media.ShortDescription || "";
          }
          break;
      }
    }
    return (
      <div className="MediaInfo">
        <div className="MediaInfo__content">
          <div className="MediaInfo__title-container">
            <div
              className="MediaInfo__title"
              onClick={() => RouteHelper.goToDetails(media)}
            >
              {title}
            </div>

            {media?.ParentMediaId && (
              <div className="MediaInfo__duration">
                {TimeHelper.formatDurationMilliseconds(1966, "(HH):mm:ss")}
              </div>
            )}
          </div>

          <div className="MediaInfo__data">
            {!isPackage && !media?.ParentMediaId && (
              <MediaAdditionalInfo media={media} />
            )}
            {/* TODO: Perhaps will be implemented later on */}
            {/* {!isPackage && !media?.ParentMediaId && <Rating />} */}

            <MDUp>
              <div
                className="MediaInfo__description"
                onClick={() => RouteHelper.goToDetails(media)}
                dangerouslySetInnerHTML={{ __html: description || "" }}
              ></div>
            </MDUp>

            <div
              className="MediaInfo__details"
              onClick={() => RouteHelper.goToDetails(media)}
            >
              {t("COMMON__SEE_DETAILS", "See details")}
            </div>
          </div>
        </div>

        {!isPackage && (
          <div className="MediaInfo__actions">
            <PlayInlineButton media={media} />
            {isProductOwnByUser && (
              <div className="MediaInfo__action" onClick={this.toggleMyList}>
                <i className="MediaInfo__action-icon">
                  {isOnMyList ? <MinusIcon /> : <PlusIcon />}
                </i>
                <span style={{ opacity: 0.87 }}>
                  {isOnMyList
                    ? t(
                        "COMMON__BUTTON_REMOVE_FROM_MY_LIST",
                        "Remove from my list"
                      )
                    : t("COMMON__BUTTON_ADD_TO_MY_LIST", "Add to my list")}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
