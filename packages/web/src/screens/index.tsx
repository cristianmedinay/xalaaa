/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AnalyticsProvider,
  AuthorizationHelper,
  AuthStore,
  ConfigurationHelper,
  ConfigurationStore,
  DataProvider,
  DidomiService,
  IAppState,
  IScreenModel,
  PlatformType,
  ROUTES,
  ScreenFrameType,
  ScreenType,
  ThemeContext,
  ThemeProvider,
  useDispatch,
  useSelector,
} from "@xala/common";
import Color from "color";
import { ConnectedRouter } from "connected-react-router";
import cssVars from "css-vars-ponyfill";
import { History } from "history";
import React, { useCallback, useEffect, useState } from "react";
import { ReactReduxContext } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { AuthenticatedRoute, UpdateConsentModal } from "components";
import { MediaCreator } from "components/MediaCreator";
import { ScrollToTop, useConfiguration } from "hooks";
import { initTranslations } from "i18n";

import { version as appVersion } from "../../package.json";

import { AlbumDetailsScreen } from "./AlbumDetailsScreen";
import App from "./App";
import {
  ConfirmAccountWithPasswordScreen,
  ConfirmEmailScreen,
  ForgotPasswordScreen,
  ForgotPasswordSuccessScreen,
  LoginScreen,
  RegisterScreen,
  RegisterSuccessScreen,
  ResendConfirmationSuccessScreen,
  ResetPasswordScreen,
} from "./AuthScreen";
import { ChannelDetailsScreen } from "./ChannelDetailsScreen";
import { CustomScreen } from "./CustomScreen";
import { DeleteAccountScreen } from "./DeleteAccountScreen";
import { DeleteAccountSuccessScreen } from "./DeleteAccountSuccessScreen";
import { Events } from "./EventsScreen";
import { IntroScreen } from "./IntroScreen";
import { LinkScreen } from "./LinkScreen/LinkScreen";
import { MainScreen } from "./MainScreen";
import { MovieDetailsScreen } from "./MovieDetailsScreen";
import { MyListScreen } from "./MyListScreen";
import { PackageDetailsScreen } from "./PackageDetailsScreen";
import { PaymentChangeStatusScreen } from "./PaymentChangeStatusScreen";
import { PaymentScreen } from "./PaymentScreen";
import { PaymentStatusScreen } from "./PaymentStatusScreen";
import { PlaylistScreen } from "./PlaylistScreen";
import { PrivacyPolicyScreen } from "./PrivacyPolicyScreen";
import {
  EditFavoriteContentsComponent,
  EditPersonalDataComponent,
  ProfileDetailsScreen,
} from "./ProfileDetailScreen";
import { SearchScreen } from "./SearchScreen";
import { SeriesDetailsScreen } from "./SeriesDetailsScreen";
import { SettingsScreen } from "./SettingsScreen";
import { Splash } from "./Splash";
import { Watch } from "./Watch";

const themeProvider: ThemeProvider = new ThemeProvider();

export interface IRootProps {
  history: History;
}

export const Root = ({ history }: IRootProps) => {
  const dispatch = useDispatch();
  const { initializeTask, clearTask } = useConfiguration();
  const [isTaskActive, setIsTaskActive] = useState(false);
  const [path, setPath] = useState(window.location.pathname);
  const [prevPath, setPrevPath] = useState(window.location.pathname);
  const [isUpdatedConfigAvailable, setIsUpdatedConfigAvailable] =
    useState(false);

  const configuration = useSelector(
    (state: IAppState) => state.configuration.configuration
  );

  const isConfigurationLoading = useSelector(
    (state: IAppState) => state.configuration.isLoading
  );

  const isUserDataPreloaded = useSelector(
    (state: IAppState) => state.core.isUserDataPreloaded
  );

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  const createRoute = (screen: IScreenModel): React.ReactElement => {
    switch (screen.ScreenFrameTypeCode) {
      case ScreenFrameType.Custom:
        return (
          <Route
            exact
            key={screen.Id}
            path={`/${ConfigurationHelper.getScreenRouteKey(screen)}`}
            component={CustomScreen}
          />
        );
      default:
        return (
          <Route
            exact
            key={screen.Id}
            path={`/${ConfigurationHelper.getScreenRouteKey(screen)}`}
            component={MainScreen}
          />
        );
    }
  };

  const createRoutes = () => {
    if (!configuration) {
      return null;
    }

    const routes: React.ReactElement[] = [];

    if (configuration && configuration.Screens) {
      for (const screenKey in configuration.Screens) {
        switch (screenKey) {
          case ScreenType.Custom:
            const customScreens = configuration.Screens.CUSTOM;
            for (const customScreenKey in customScreens) {
              const customScreen = customScreens[customScreenKey];

              routes.push(createRoute(customScreen));
            }
            break;
          case ScreenType.Search:
          case ScreenType.ApplicationFooter:
          case ScreenType.ApplicationMenu:
            // Skip creating route for predefined screens;
            continue;
          default:
            const screen = configuration.Screens[screenKey];

            routes.push(createRoute(screen));
            break;
        }
      }
    }

    return routes;
  };

  const checkIfAlreadyLoggedIn = useCallback(async () => {
    const isAlreadyLoggedIn = await AuthorizationHelper.isLoggedIn();
    setIsLoggedIn(isAlreadyLoggedIn);
  }, [configuration]);

  const handleSiteResize = () => {
    document.documentElement.style.fontSize = `${themeProvider.getFontSize()}px`;
  };

  useEffect(() => {
    const unlisten = history.listen((event) => {
      setPath((prev) => {
        setPrevPath(prev);
        return event.pathname;
      });
    });
    return () => {
      unlisten();
    };
  }, [history]);

  useEffect(() => {
    const task = async () => {
      const isNewConfigAvailable = await DataProvider.isNewConfigAvailable();
      setIsUpdatedConfigAvailable(isNewConfigAvailable);
      if (isNewConfigAvailable) {
        dispatch(
          ConfigurationStore.Actions.getConfiguration(
            PlatformType.Web,
            isNewConfigAvailable
          )
        );
      }
    };

    if (isTaskActive) {
      if (path.includes(ROUTES.PLAYER_SCREEN)) {
        clearTask();
        setIsTaskActive(false);
      }
    } else {
      if (prevPath.includes(ROUTES.PLAYER_SCREEN)) {
        task();
      }
      if (!path.includes(ROUTES.PLAYER_SCREEN)) {
        setIsTaskActive(true);
        initializeTask(task);
      }
    }
  }, [dispatch, isTaskActive, clearTask, initializeTask, path, prevPath]);

  useEffect(() => {
    window.addEventListener("resize", handleSiteResize);

    DataProvider.initSession();

    dispatch(AuthStore.Actions.syncUser());
    dispatch(ConfigurationStore.Actions.getConfiguration(PlatformType.Web));

    return () => {
      window.removeEventListener("resize", handleSiteResize);
    };
  }, []);

  useEffect(() => {
    if (!configuration) {
      return;
    }

    initTranslations(configuration.Translations);

    themeProvider.setBrandings(configuration);
    document.documentElement.style.fontSize = `${themeProvider.getFontSize()}px`;

    const cssVariables = {
      "--primary-color": themeProvider.getColor("AppPrimaryColor"),
      "--primary-color-d-50": Color(themeProvider.getColor("AppPrimaryColor"))
        .darken(0.5)
        .hex(),
      "--primary-text-color": themeProvider.getColor("AppPrimaryTextColor"),
      "--primary-text-color-d-30": Color(
        themeProvider.getColor("AppPrimaryTextColor")
      )
        .darken(0.3)
        .hex(),
      "--secondary-color": themeProvider.getColor("AppSecondaryColor"),
      "--secondary-text-color": themeProvider.getColor("AppSecondaryTextColor"),
      "--bg-color": themeProvider.getColor("AppBackgroundColor"),
      "--bg-color-o-30": Color(themeProvider.getColor("AppBackgroundColor"))
        .fade(0.3)
        .hex(),
      "--footer-bg-color": themeProvider.getColor("FooterBackgroundColor"),
      "--footer-link-color": themeProvider.getColor("FooterLinkColor"),
      "--footer-link-hover-color": themeProvider.getColor(
        "FooterLinkHoverColor"
      ),
      "--header-bg-color": themeProvider.getColor("HeaderBackgroundColor"),
      "--header-link-color": themeProvider.getColor("HeaderLinkColor"),
      "--header-link-hover-color": themeProvider.getColor(
        "HeaderLinkHoverColor"
      ),
      "--font-family": `${themeProvider.getFontFamily()}, Helvetica, Arial, sans-serif`,
      "--cell-background-color": themeProvider.getColor(
        "AppCellsBackgroundColor"
      ),
    };

    cssVars({
      rootElement: document,
      variables: cssVariables,
    });

    checkIfAlreadyLoggedIn();
  }, [configuration]);

  if (
    !configuration ||
    (isConfigurationLoading && !isUpdatedConfigAvailable) ||
    !isUserDataPreloaded
  ) {
    return <Splash />;
  }

  return (
    <ThemeContext.Provider value={{ themeProvider: themeProvider }}>
      <App>
        <DidomiService system="web" />
        <ConnectedRouter
          history={history}
          context={ReactReduxContext}
          noInitialPop
        >
          <ScrollToTop />
          <AnalyticsProvider system="web" version={appVersion}>
            <Switch>
              <Route exact path="/" component={IntroScreen}>
                {isLoggedIn && <Redirect to={ROUTES.HOME} />}
              </Route>
              <Route
                path={`${ROUTES.MOVIE_DETAILS_SCREEN}/:id`}
                component={MovieDetailsScreen}
              />
              <Route
                path={`/launch${ROUTES.MOVIE_DETAILS_SCREEN}/:id`}
                component={MovieDetailsScreen}
              />
              <Route
                exact
                path={`${ROUTES.PROFILE_DETAILS_SCREEN}`}
                component={ProfileDetailsScreen}
              />
              <Route
                exact
                path={`${ROUTES.PROFILE_DETAILS_SCREEN}/edit_personal_data`}
                component={EditPersonalDataComponent}
              />
              <Route
                exact
                path={`${ROUTES.PROFILE_DETAILS_SCREEN}/edit_favorite_contents`}
                component={EditFavoriteContentsComponent}
              />
              <Route
                path={`${ROUTES.CHANNEL_DETAILS_SCREEN}/:id`}
                component={ChannelDetailsScreen}
              />
              <Route
                path={`/launch${ROUTES.CHANNEL_DETAILS_SCREEN}/:id`}
                component={ChannelDetailsScreen}
              />

              {/* In future we could probably create separate component
              for that, for now (demo purposes) it's not needed, and there's
              a change we won't need new screen at any time */}
              <Route
                path={`${ROUTES.ARTICLE_SCREEN}/:id`}
                component={MovieDetailsScreen}
              />
              <Route
                path={`${ROUTES.SERIES_DETAILS_SCREEN}/:id`}
                component={SeriesDetailsScreen}
              />
              <Route
                path={`/launch${ROUTES.SERIES_DETAILS_SCREEN}/:id`}
                component={SeriesDetailsScreen}
              />
              <Route
                path={`${ROUTES.ALBUM_DETAILS_SCREEN}/:id`}
                component={AlbumDetailsScreen}
              />
              <Route
                path={`/launch${ROUTES.ALBUM_DETAILS_SCREEN}/:id`}
                component={AlbumDetailsScreen}
              />
              <Route
                path={`${ROUTES.PACKAGE_DETAILS_SCREEN}/:id`}
                component={PackageDetailsScreen}
              />
              <Route path={`${ROUTES.PLAYER_SCREEN}/:id`} component={Watch} />
              <Route
                exact
                path={`${ROUTES.PRIVACY_POLICY_SCREEN}/:id`}
                component={PrivacyPolicyScreen}
              />
              <Route
                exact
                path={`${ROUTES.EVENTS}`}
                render={(props) => {
                  return <Events {...props} />;
                }}
              />
              <Route
                exact
                path={`${ROUTES.MEDIA_CREATOR}/:id`}
                component={MediaCreator}
              />
              <Route
                exact
                path={`${ROUTES.PLAYLIST_SCREEN}/:id/:title`}
                render={(props) => {
                  return <PlaylistScreen {...props} />;
                }}
              />
              <Route
                exact
                path={ROUTES.SEARCH_SCREEN}
                component={SearchScreen}
              />
              <Route
                exact
                path={ROUTES.MY_LIST_SCREEN}
                render={(props) => {
                  return <MyListScreen {...props} />;
                }}
              />
              <AuthenticatedRoute
                exact
                path={`${ROUTES.BUY_SCREEN}/:id`}
                component={PaymentScreen}
              />
              <Route
                exact
                path={`${ROUTES.PAYMENT_STATUS_SCREEN}/:id`}
                component={PaymentStatusScreen}
              />
              <Route
                exact
                path={`${ROUTES.PAYMENT_CHANGE_STATUS_SCREEN}/:id`}
                component={PaymentChangeStatusScreen}
              />
              <Route
                exact
                path={`${ROUTES.DELETE_ACCOUNT}`}
                component={DeleteAccountScreen}
              />

              <Route
                exact
                path={`${ROUTES.DELETE_ACCOUNT_SUCCESS}`}
                component={DeleteAccountSuccessScreen}
              />
              <Route exact path={`${ROUTES.LOGIN}`} component={LoginScreen} />
              <AuthenticatedRoute
                exact
                path={`${ROUTES.SETTINGS_SCREEN}/:submenuKey`}
                render={(props) => {
                  return <SettingsScreen {...props} />;
                }}
              />
              <Route exact path={ROUTES.REGISTER} component={RegisterScreen} />
              <Route
                exact
                path={`${ROUTES.REGISTER}/:hash`}
                component={RegisterScreen}
              />
              <Route
                exact
                path={ROUTES.FORGOT_PASSWORD}
                component={ForgotPasswordScreen}
              />
              <Route
                exact
                path={ROUTES.REGISTER_SUCCESS}
                component={RegisterSuccessScreen}
              />

              <Route
                exact
                path={ROUTES.FORGOT_PASSWORD_SUCCESS}
                component={ForgotPasswordSuccessScreen}
              />
              <Route
                exact
                path={ROUTES.RESET_PASSWORD}
                render={(props) => {
                  return <ResetPasswordScreen {...props} />;
                }}
              />
              <Route
                exact
                path={ROUTES.REGISTER_CONFIRM}
                render={(props) => {
                  return <ConfirmEmailScreen {...props} />;
                }}
              />
              <Route
                exact
                path={ROUTES.RESEND_CONFIRMATION_SUCCESS}
                component={ResendConfirmationSuccessScreen}
              />
              <Route
                exact
                path={ROUTES.REGISTER_CONFIRM_ACCOUNT_WITH_PASSWORD}
                render={(props) => {
                  return <ConfirmAccountWithPasswordScreen {...props} />;
                }}
              />
              <Route
                exact
                path={ROUTES.LINK_SCREEN}
                render={() => {
                  return <LinkScreen configuration={configuration} />;
                }}
              />
              {createRoutes()}
            </Switch>
            <UpdateConsentModal />
          </AnalyticsProvider>
        </ConnectedRouter>
      </App>
    </ThemeContext.Provider>
  );
};
