/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ComponentType,
  DataProvider,
  IConfigurationModel,
  IErrorModel,
  IListComponentModel,
  IMediaListModel,
  IMediaModel,
  IUserModel,
  MediaStore,
  Orientation,
  StorageManager,
  useDataLoader,
} from "@xala/common";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { WithTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router";
import { ActionCreator } from "redux";

import { MediaButtonVariant } from "enums";

import {
  AppFooter,
  AppHeader,
  GridComponent,
  LoaderSpinner,
  MediaButton,
} from "../../components";
import { AddAssetDialog } from "../../components/Dialog/AddAssetDialog";
import { MonthPicker } from "../../components/MonthPicker";

import "./Events.scss";

import CalendarSelected from "../../resources/icons/calendar-selected.svg";
import PlusCircleIcon from "../../resources/icons/plus-circle.svg";
import ChevronDown from "../../resources/icons/chevron-down.svg";

import { AssetEventType, CellType } from "@xala/common";

const ASSETS_CREATING_ROLE_KEY = "ASSETS_DEFINE";

export interface IEventsScreenStateProps {
  configuration?: IConfigurationModel;
  eventsList: IMediaListModel;
}

export interface IEventsScreenDispatchProps {
  searchMedia: ActionCreator<MediaStore.Types.ISearchMediaAction>;
}

export type IEventsScreenOwnProps = RouteComponentProps<{
  id?: string;
}>;

export type Month = dayjs.Dayjs | string | undefined;

export interface IEventsScreenProps
  extends IEventsScreenStateProps,
    IEventsScreenDispatchProps,
    IEventsScreenOwnProps,
    WithTranslation {}

export const Events: React.FC<IEventsScreenProps> = ({
  eventsList,
  searchMedia,
  t,
  configuration,
}) => {
  const [month, setMonth] = useState<Month>();
  const [lastSearchedMonth, setLastSearchedMonth] = useState<Month>();
  const [pageNumber, setPageNumber] = useState(1);
  const [isMyEventsSelected, setIsMyEventsSelected] = useState(false);
  const [eventsToBeDisplayed, setEventsToBeDisplayed] = useState<
    IMediaModel[] | undefined
  >([]);

  const { data: loggedUser } = useDataLoader<IUserModel, IErrorModel>({
    loader: () =>
      DataProvider.getProfile({}).then((data) => ({
        ok: true,
        data,
      })),
    deps: [],
  });

  const assetDefineRole = loggedUser?.Roles
    ? loggedUser?.Roles.find((role) => {
        if (typeof role === "object") {
          return role.RoleNormalizedName === ASSETS_CREATING_ROLE_KEY;
        }
      })
    : undefined;

  const canCreate =
    assetDefineRole && typeof assetDefineRole === "object"
      ? assetDefineRole.RoleName.includes("creating")
      : false;

  const deleteLastSearchedMonth = () => {
    StorageManager.deleteValue("eventsMonth");
  };

  useEffect(() => {
    setEventsToBeDisplayed(sortEvents(filterPassedEvents(eventsList.Entities)));
  }, [eventsList.Entities]);

  useEffect(() => {
    let mountedComponent = true;
    const getLastSearchedMonth = async () => {
      const lastMonth = await StorageManager.getValue("eventsMonth");
      if (mountedComponent) {
        setLastSearchedMonth(lastMonth);
      }
    };

    if (!month) {
      setMonth(dayjs().startOf("month"));
    }

    getLastSearchedMonth();
    return () => {
      mountedComponent = false;
    };
  }, []);

  useEffect(() => {
    if (lastSearchedMonth) {
      setMonth(lastSearchedMonth);
    }
  }, [lastSearchedMonth]);

  useEffect(() => {
    searchMedia({
      CreatorUsers: isMyEventsSelected
        ? [loggedUser?.Id.toString()]
        : undefined,
      PageNumber: pageNumber,
      PageSize: 12,
      StartDateTimeFrom: dayjs(month).format(),
      StartDateTimeTo: dayjs(month).add(1, "month").format(),
      IncludeCount: true,
      IncludeImages: true,
      IncludeChildAssets: true,
      Types: Object.values(AssetEventType),
    });
    return () => {
      StorageManager.setValue("eventsMonth", month);
    };
  }, [month, pageNumber, isMyEventsSelected]);

  useEffect(() => {
    window.addEventListener("unload", deleteLastSearchedMonth);
    return () => {
      window.removeEventListener("unload", deleteLastSearchedMonth);
    };
  });

  const getMore = () => {
    setPageNumber(pageNumber + 1);
  };

  const changeMonth = (newMonth: Month) => {
    setMonth(newMonth);
    setPageNumber(1);
  };

  const sortEvents = (entities?: IMediaModel[]) => {
    return entities?.sort((a, b) => {
      const aTime = a.StartDateTime ? new Date(a.StartDateTime).getTime() : 0;
      const bTime = b.StartDateTime ? new Date(b.StartDateTime).getTime() : 0;
      return aTime - bTime;
    });
  };

  const filterPassedEvents = (entities?: IMediaModel[]) => {
    return entities?.filter((event) => {
      const eventShowTime = event.EndDateTime
        ? new Date(event.EndDateTime).getTime()
        : 0;
      return eventShowTime > new Date(Date.now()).getTime();
    });
  };

  const toggleMyEvents = () => {
    setIsMyEventsSelected((prev) => !prev);
  };

  const eventsListModel: IListComponentModel = {
    CellType: CellType.Event,
    ComponentTypeCode: ComponentType.List,
    Orientation: Orientation.Grid,
    MediaList: eventsToBeDisplayed,
  };

  const hasMoreItems = eventsList
    ? eventsList?.TotalCount > eventsList?.Entities?.length
    : false;
  const isOnNextPage =
    eventsList?.Filter?.PageNumber && eventsList?.Filter?.PageNumber > 1;

  const rows = eventsList ? Math.ceil(eventsList?.Entities?.length / 4) : 3;

  return (
    <>
      <div className="events-screen">
        <AppHeader configuration={configuration} />

        <section className="events">
          <div className="event-container">
            {canCreate && (
              <div className="event-container__actions">
                <p
                  onClick={toggleMyEvents}
                  className={isMyEventsSelected ? "myEvents--selected" : ""}
                >
                  <CalendarSelected />
                  {t("EVENT_SCREEN__FILTER_MY_EVENTS", "My events")}
                </p>
                <AddAssetDialog>
                  <p>
                    <PlusCircleIcon />
                    {t("EVENT_SCREEN__ADD_EVENT", "Add event")}
                  </p>
                </AddAssetDialog>
              </div>
            )}
            <div className="__event-picker">
              <MonthPicker month={month} setMonth={changeMonth} />
            </div>
          </div>
        </section>
        <div className="events-grid">
          <GridComponent
            component={eventsListModel}
            loading={eventsList?.IsLoading}
            rows={rows}
            columns={4}
          />
          {hasMoreItems && (
            <div className="events-screen__loader">
              {eventsList?.IsLoading && isOnNextPage ? (
                <LoaderSpinner />
              ) : (
                <MediaButton
                  className="events-screen__loader__more-button"
                  icon={<ChevronDown />}
                  iconElevated={true}
                  variant={MediaButtonVariant.Transparent}
                  onClick={getMore}
                >
                  {t("COMMON__BUTTON_MORE", "Show more")}
                </MediaButton>
              )}
            </div>
          )}
        </div>
      </div>
      <AppFooter />
    </>
  );
};
