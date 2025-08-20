/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { DataProvider, IMediaModel } from "@xala/common";
import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { LoaderSpinner } from "components/LoaderSpinner";
import { MediaButtonVariant } from "enums";
import AddedIcon from "resources/icons/added.svg";
import NotAddedIcon from "resources/icons/not-added.svg";

import { MediaButton } from "../MediaButton";

interface IMyListButtonProps {
  media: IMediaModel;
}

export const MyListButton = React.memo(({ media }: IMyListButtonProps) => {
  const [isOnMyList, setIsOnMyList] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { t } = useTranslation();

  const toggleMyList = () => {
    if (media.Id) {
      setIsLoading(true);
      const togglePromise = isOnMyList
        ? DataProvider.removeFromMyList(media.Id)
        : DataProvider.addToMyList(media.Id);

      togglePromise
        .then(() => setIsOnMyList(!isOnMyList))
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    let mount = true;
    const loadStatus = async () => {
      if (media.Id) {
        mount && setIsLoading(true);
        await DataProvider.isOnMyList(media.Id)
          .then((result) => {
            if (isOnMyList === result) {
              return;
            }
            mount && setIsOnMyList(result);
          })
          .finally(() => mount && setIsLoading(false));
      }
    };

    // noinspection JSIgnoredPromiseFromCall
    loadStatus();

    return () => {
      mount = false;
    };
  }, [isOnMyList, media.Id]);

  const getIcon = () => {
    if (isLoading) {
      return <LoaderSpinner height={20} width={20} />;
    }
    return isOnMyList ? <AddedIcon /> : <NotAddedIcon />;
  };

  return (
    <MediaButton
      variant={MediaButtonVariant.Transparent}
      icon={getIcon()}
      iconElevated={true}
      onClick={toggleMyList}
      tooltip={t("SAVE")}
    />
  );
});

MyListButton.displayName = "MyListButton";
