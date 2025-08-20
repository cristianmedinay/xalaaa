/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  dispatch,
  ImageHelper,
  IMediaModel,
  MediaStreamType,
  ROUTES,
  TimeHelper,
  useConfigurationSelector,
  useGetMedia,
  useGetMediaPlayInfo,
  useIdRouteParam,
} from "@xala/common";
import cx from "classnames";
import { replace } from "connected-react-router";
import React, {
  memo,
  ReactElement,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AppFooter, AppHeader, ImageOverlay, TeaserPlayer } from "components";
import { useHandleResize } from "hooks";
import resources from "resources/list";
import { Splash } from "screens/Splash";

import "./MediaDetailsScreen.scss";

export interface IMediaDetailsScreenProps {
  className?: string;
  media?: IMediaModel;
  disableAutoFetch?: boolean;
  children?: ReactElement;
  muteButton?: RefObject<HTMLButtonElement>;
}

const TABLET_DOWN_BREAKPOINT = 799;

export const MediaDetailsScreen = memo((props: IMediaDetailsScreenProps) => {
  const {
    className,
    children,
    media,
    disableAutoFetch = false,
    muteButton,
  } = props;

  const [isTeaserEndedOrErrorEmited, setIsTeaserEndedOrErrorEmited] =
    useState(false);
  const configuration = useConfigurationSelector();
  const mediaId = useIdRouteParam();
  const width = useHandleResize(0);
  const isTabletDownScreenWidth = width <= TABLET_DOWN_BREAKPOINT;

  const { isLoading, isError } = useGetMedia({ mediaId, disableAutoFetch });

  const { playInfo, isLoading: isPlayInfoLoading } = useGetMediaPlayInfo({
    mediaId,
    streamType: MediaStreamType.Promo,
  });

  const isAvailableInTimeFrame = (media: IMediaModel) => {
    if (media?.AvailableFrom && media?.AvailableTo) {
      return TimeHelper.isCurrentBetween(
        media.AvailableFrom,
        media.AvailableTo
      );
    }

    if (media?.AvailableFrom) {
      return TimeHelper.isBeforeCurrent(media.AvailableFrom);
    }

    if (media?.AvailableTo) {
      return TimeHelper.isAfterCurrent(media.AvailableTo);
    }

    return true;
  };

  const isNotAvailable = media?.Title && !isAvailableInTimeFrame(media);

  useEffect(() => {
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (isError || isNotAvailable) {
      dispatch(replace(ROUTES.HOME));
    }
  }, [isError, isNotAvailable]);

  const highlightsImageUrl = useMemo(() => {
    return (
      ImageHelper.getHighlightsImageUrl(media?.Images) ||
      resources.highlightsPlaceholder
    );
  }, [media]);

  if ((isLoading && !media) || isError) {
    return <Splash />;
  }

  if (!media) {
    return null;
  }

  return (
    <div className={cx("MediaDetails", className)}>
      <section className="MediaDetails__section">
        <AppHeader configuration={configuration} />
        <div className="MediaDetails__background">
          {!isPlayInfoLoading && (
            <>
              {playInfo?.ContentUrl &&
                !isTabletDownScreenWidth &&
                !isTeaserEndedOrErrorEmited && (
                  <>
                    <div className="MediaDetails__background__teaserContainer">
                      <TeaserPlayer
                        media={media}
                        mediaPlayInfo={playInfo}
                        setIsTeaserEndedOrErrorEmited={
                          setIsTeaserEndedOrErrorEmited
                        }
                        muteButton={muteButton}
                      />
                    </div>
                    <div className="MediaDetails__background__teaserGradientVertical" />
                  </>
                )}

              {(!playInfo?.ContentUrl ||
                isTabletDownScreenWidth ||
                isTeaserEndedOrErrorEmited) && (
                <>
                  <ImageOverlay
                    src={highlightsImageUrl}
                    imageStyle={{
                      height: "100%",
                      width: "auto",
                    }}
                  />
                  <div className="MediaDetails__background__imageOverlayGradientVertical" />
                </>
              )}
              <div className="MediaDetails__background__gradientHorizontal" />
            </>
          )}
        </div>

        {children}
      </section>
      <AppFooter />
    </div>
  );
});
