/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAuthCodeRequestModel } from "models/Auth/IAuthCodeRequestModel";

import { MediaListType, ScreenType, SourceType } from "../../../enums";
import { AuthorizationHelper, StorageHelper } from "../../../helpers";
import {
  EpgDay,
  IAnalyticsMarkerModel,
  IAssetAgeRestrictionModel,
  IAssetContentModel,
  IAssetImageModel,
  IAssetInAssetModel,
  IAssetInAssetSearchResponseModel,
  IAssetListModel,
  IAssetModel,
  IAssetPriceModel,
  IAssetPurchasePeriodTypeModel,
  IAssetSearchFilterModel,
  IAssetsInAssetSearchFilterModel,
  IAuthRequestModel,
  IAuthResponseModel,
  IAuthVerifyLoginModel,
  IChangePasswordModel,
  IConfigurationBrandingModel,
  IConfigurationModel,
  IConfigurationTranslationsModel,
  IConfirmAccountWithPasswordModel,
  ICurrencyModel,
  IForgotPasswordModel,
  IInsertAssetRequestModel,
  IInsertAssetResponseModel,
  IInviteManyUsersModel,
  ILoginCodeModel,
  IMediaCategoryListModel,
  IMediaChannelsForUserModel,
  IMediaListModel,
  IMediaListOptionsModel,
  IMediaModel,
  IMediaOptionsModel,
  IMediaPaymentRequestModel,
  IMediaPaymentResponseModel,
  IMediaPlayInfoModel,
  IMediaPlayInfoOptionsModel,
  IMediaPurchaseOfferModel,
  IMediaSearchFilterModel,
  IMediaSearchMediaInMediaFilterModel,
  IMediaSearchStateModel,
  IMediaStatisticsOptionsModel,
  IPaymentListModel,
  IPaymentModel,
  IPaymentOptionsModel,
  IPaymentSearchFilterModel,
  IPaymentStatusModel,
  IPaymentTypeMappingAndOptionsModel,
  IRegisterConfirmEmailModel,
  IRegisterRequestEmailModel,
  IRemoveManyUsersModel,
  IResetForgotPasswordModel,
  IResetPasswordModel,
  IScreenModel,
  ITownsListModel,
  IUserAssetPropertiesModel,
  IUserAssetPurchasesListModel,
  IUserAssetPurchasesSearchFilterModel,
  IUserConsentModel,
  IUserDeviceModel,
  IUserInAssetModel,
  IUserInAssetRoleModel,
  IUserModel,
  IUserProductModel,
  IUserPurchasesAggregatedModel,
  IUserRequestOptionsModel,
  IUserSettingsModel,
} from "../../../models";
import { IMediaChannelProgramOptionsModel } from "../../../models/Media/IMediaChannelProgramOptionsModel";
import {
  AnalyticsService,
  AuthService,
  HttpFactory,
  NotificationClient,
  StorageManager,
} from "../../../services";
import { DownloadAssetsService } from "../../../services/Download";
import { AuthStore, dispatch } from "../../../store";
import { IDataProvider } from "../IDataProvider";

import {
  IAssetPriceListModel,
  IAssetPriceSearchFilterModel,
  ICatchupInsertModel,
  ICatchupInsertResponseModel,
  IResendConfirmationByUserModel,
  IUserDeleteAccountRequestModel,
  IUsersInAssetListModel,
  IUsersInAssetSearchFilterModel,
  IUsersListModel,
  IUsersSearchFilterModel,
} from "./models";
import {
  AssetInAssetService,
  AssetPriceService,
  AssetPurchasePeriodTypeService,
  AssetService,
  ConfigurationService,
  CurrenciesService,
  HttpRequestFulfilledInterceptor,
  HttpRequestRejectedInterceptor,
  HttpResponseFulfilledInterceptor,
  HttpResponseRejectedInterceptor,
  MediaService,
  PaymentsService,
  RegisterService,
  TownsService,
  UserAssetPurchasesService,
  UserConsentsService,
  UserMediaPropertiesService,
  UserService,
  UserSettingsService,
} from "./services";
import { UserInAssetService } from "./services/User/UserInAsset/UserInAssetService";

export class InternalDataProvider implements IDataProvider {
  currenciesService = new CurrenciesService();
  configurationService = new ConfigurationService();
  authService = new AuthService();
  notificationClient = new NotificationClient();
  registerService = new RegisterService();
  mediaService = new MediaService();
  townsService = new TownsService();
  assetService = new AssetService();
  assetInAssetService = new AssetInAssetService();
  assetPriceService = new AssetPriceService();
  assetPurchasePeriodTypeService = new AssetPurchasePeriodTypeService();
  paymentsService = new PaymentsService();
  userMediaPropertiesService = new UserMediaPropertiesService();
  userAssetPurchasesService = new UserAssetPurchasesService();
  userConsentsService = new UserConsentsService();
  userService = new UserService();
  userInAssetService = new UserInAssetService();
  userSettingsService = new UserSettingsService();
  analyticsService = new AnalyticsService();
  httpFactory = HttpFactory.getInstance();

  private _defaultTranslations: IConfigurationTranslationsModel = {
    es: {
      LOGIN_INFO: "ir al {{LINK}}/link para iniciar sesión",
      LOGIN_INFO_LINK: "https://laxarxames.cat",
      LOGIN_LABEL: "Iniciar sesión",
      APP_CLOSE_DIALOG__TITLE: "Cerrar aplicación?",
      APP_CLOSE_DIALOG__MESSAGE: "Quieres cerrar la aplicación?",
      APP_GLOBAL_ERROR_DIALOG__TITLE: "Error",
      CLOSE__APP: "Cerrar aplicación",
      COMMON__INTERNET_CONNECTION_ERROR_TITLE: "No hay conexión.",
      COMMON__INTERNET_CONNECTION_ERROR_MESSAGE:
        "No hay conexión, por favor intente de reconectar.",
      INCORRECT_FILE_TYPE: "Tipo de archivo incorrecto",
      LINK__BUTTON: "Link",
      LINK__ERROR_SHORT_MESSAGE:
        " El código que ha introducido es demasiado corto. Por favor, rellene todos los campos",
      LINK__ERROR_MESSAGE:
        "El código ingresado es incrrecto, por favor intente nuevamente",
      LINK__SUCCESS_MESSAGE: "Su cuenta ha sido vinculada",
      MENU_SEARCH: "Buscar",
      MENU_HOME: "Home",
      MENU_TRANSMISSIONS: "Broadcasts",
      MENU_RETRANSMISSIONS: "Retransmisión",
      MENU_CATEGORIES: "Categorias",
      MENU_MY_LIST: "Mi lista",
      MENU_SETTINGS: "Configuración",
      MEDIA_PERSON_ROLE_DISPLAY_NAME: "Comentario",
      MEDIA_PERSON_ROLE_DIRECTOR_LABEL: "Director:",
      MEDIA_PERSON_ROLE_WRITER_LABEL: "Escritor:",
      MEDIA_PERSON_ROLE_CAST_LABEL: "Reparto:",
      MEDIA_PERSON_ROLE_COMMENTATOR_LABEL: "Comentador:",
      MEDIA_LIST_ITEM_ONGOING_MARKER: "En curso",
      MEDIA_LIST_ITEM_YESTERDAY_MARKER: "Ayer",
      MESSAGE__INCORRECT_OLD_PASSWORD: "Password antigua incorrecta",
      PHONE_COUNTRY_CODE_VALIDATION_MESSAGE:
        "Se requiere el código de país con el signo " + " (por ejemplo, +48)",
      PHONE_LENGTH_VALIDATION_MESSAGE: "Máximo 15 carácteres",
      CATEGORY_LIST_TITLE_DEFAULT: "CATEGORY LIST (DEFAULT)",
      SEARCH__HEADER: "SEARCH RESULTS FOR:",
      SEARCH__RECOMMENDATION_LIST: "RECOMMENDED",
      SEARCH__INPUT_LABEL: "Search",
      SEARCH__NO_RESULTS_MESSAGE:
        "Perdón, no hemos encontrado resultados acordes a su búsqueda.",
      MY_LIST__NO_RESULTS_TITLE: "La lista está vacía",
      MY_LIST__NO_RESULTS_MESSAGE:
        "Aún no has añadido ningún material a tu lista.",
      RECOMMENDATIONS_LIST__TITLE: "Ver también",
      MOVIE_DETAILS__START_TRANSMISSION_TITLE: "Inicio de transmición:",
      PLAYER_SETTINGS__MAIN_MENU_TITLE: "Configuración",
      PLAYER_SETTINGS__MENU_VIDEO_QUALITY_TITLE: "Calidad de Video",
      PLAYER_SETTINGS__MENU_VIDEO_QUALITY_OPTION_AUTO: "Auto",
      PLAYER_SETTINGS__MENU_SUBTITLES_TITLE: "Lenguaje de subtítulos",
      PLAYER_SETTINGS__MENU_SUBTITLES_OPTION_NO_SUBTITLES: "Sin subtítulos",
      PLAYER_SETTINGS__MENU_SOUNDTRACK_TITLE: "Soundtrack",
      PLAYER_SETTINGS__MENU_SOUNDTRACK_OPTION_NO_SOUNDTRACK:
        "No hay soundtrack",
      COMMON__YES: "Si",
      COMMON__NO: "No",
      COMMON__OK: "OK",
      COMMON__WATCH: "Ver",
      COMMON__ADD_TO_MY_LIST: "Agregar a mi lista",
      COMMON__REMOVE_FROM_MY_LIST: "Quitar de mi lista",
      COMMON__NO_INFORMATION: "No hay información",
      CONNECTION_ERROR_INFO_TITLE:
        "Se ha producido un problema al cargar el contenido.",
      COMMON__WATCH_NEXT: "Ver siguiente",
      CONNECTION_ERROR_INFO_BUTTON: "Intentar otra vez",
      HELP_SETTINGS_SCREEN__TITLE: "Problemas en la aplicación?",
      PRIVACY_POLICY_SETTINGS_SCREEN__TITLE: "Política de privacidad",
      MY_CONSENTS_SETTINGS_SCREEN__TITLE: "Mis consentimientos",
      MY_CONSENTS_BUTTON__ACCEPTED: "Aceptado",
      MY_CONSENTS_BUTTON__TO_ACCEPT: "Acepto",
      REGULATIONS_SETTINGS_SCREEN__TITLE: "Regulaciones",
      ROLE: "Rol",
      SETTINGS_SCREEN__TITLE: "Configuración",
      SETTINGS_SCREEN__OPTION_ABOUT_TITLE: "Acerca de",
      SETTINGS_SCREEN__OPTION_HELP_TITLE: "Problemas en la aplicación?",
      SETTINGS_SCREEN__OPTION_MY_CONSENTS_TITLE: "Mis consentimientos",
      SETTINGS_SCREEN__OPTION_REGULATIONS_TITLE: "Regulación",
      SETTINGS_SCREEN__OPTION_PRIVACY_POLICY_TITLE: "Política de privacidad",
      EPISODES_NOT_FOUND: "Episodio no encontrado",
      USER_BUY_ON_MOBILE_OR_WEB:
        "Inicie sesión en el móvil o en la web para comprar un producto",
      USER_IN_ASSET_EVENT_NAME: "Nombre",
      TOKEN_VALID_INFO: "Token es valido por ",
      BUTTON_REFRESH_TOKEN: "Refrescar",
      VALIDATION__AVAILABILITY_STARTS_AT_START_DATE:
        "La fecha de disponibilidad debe fijarse antes de la fecha de inicio",
      VALIDATION__CATCHUP_DATE_SET_BEFORE_EVENT_ENDS:
        "La hora de inicio debe fijarse al menos 2 horas después de que finalice el evento",
      VALIDATION__CATCHUP_DATE_SET_IN_THE_PAST:
        "La disponibilidad del evento no puede fijarse en el pasado",
      VALIDATION__START_DATE_AFTER_END_DATE:
        "El evento no puede fijarse después de la fecha de finalización",
      VALIDATION__START_DATE_IS_EQUAL_TO_END_DATE:
        "La fecha de inicio del evento no puede coincidir con la fecha de finalización",
    },
    ca: {
      LOGIN_INFO: "anar al {{LINK}}/link per iniciar sessió",
      LOGIN_INFO_LINK: "https://laxarxames.cat",
      LOGIN_LABEL: "Iniciar sessió",
      APP_CLOSE_DIALOG__TITLE: "Tancar aplicació?",
      APP_CLOSE_DIALOG__MESSAGE: "Vols tancar l'aplicació?",
      APP_GLOBAL_ERROR_DIALOG__TITLE: "Error",
      CLOSE__APP: "Tancar aplicació",
      COMMON__INTERNET_CONNECTION_ERROR_TITLE: "No hi ha connexió.",
      COMMON__INTERNET_CONNECTION_ERROR_MESSAGE:
        "No hi ha connexió, si us plau proveu de reconnectar.",
      INCORRECT_FILE_TYPE: "Tipus de fitxer incorrecte",
      LINK__BUTTON: "Link",
      LINK__ERROR_SHORT_MESSAGE:
        " El codi que heu introduït és massa curt. Si us plau, ompliu tots els camps",
      LINK__ERROR_MESSAGE:
        "El codi ingressat és indirecte, si us plau intenteu novament",
      LINK__SUCCESS_MESSAGE: "El vostre compte ha estat vinculat",
      MENU_SEARCH: "Cerca",
      MENU_HOME: "Home",
      MENU_TRANSMISSIONS: "Broadcasts",
      MENU_RETRANSMISSIONS: "Retransmissió",
      MENU_CATEGORIES: "Categories",
      MENU_MY_LIST: "La meva llista",
      MENU_SETTINGS: "Configuració",
      MEDIA_PERSON_ROLE_DISPLAY_NAME: "Comentari",
      MEDIA_PERSON_ROLE_DIRECTOR_LABEL: "Director:",
      MEDIA_PERSON_ROLE_WRITER_LABEL: "Escriptor:",
      MEDIA_PERSON_ROLE_CAT_LABEL: "Repartiment:",
      MEDIA_PERSON_ROLE_COMMENTATOR_LABEL: "Comentador:",
      MEDIA_LIST_ITEM_ONGOING_MARKER: "En curs",
      MEDIA_LIST_ITEM_YESTERDAY_MARKER: "Ahir",
      MESSAGE__INCORRECT_OLD_PASSWORD: "Password antiga incorrecta",
      PHONE_COUNTRY_CODE_VALIDATION_MESSAGE:
        "Es requereix el codi de país amb el signe " + " (per exemple, +48)",
      PHONE_LENGTH_VALIDATION_MESSAGE: "Màxim 15 caràcters",
      CATEGORY_LIST_TITLE_DEFAULT: "CATEGORY LIST (DEFAULT)",
      SEARCH__HEADER: "SEARCH RESULTS FOR:",
      SEARCH__RECOMMENDATION_LIST: "RECOMMENDED",
      SEARCH__INPUT_LABEL: "Search",
      SEARCH__NO_RESULTS_MESSAGE:
        "Perdó, no hem trobat resultats d'acord amb la cerca.",
      MY_LIST__NO_RESULTS_TITLE: "La llista és buida",
      MY_LIST__NO_RESULTS_MESSAGE:
        "Encara no has afegit cap material a la teva llista.",
      RECOMMENDATIONS_LIST__TITLE: "Veure també",
      MOVIE_DETAILS__START_TRANSMISSION_TITLE: "Inici de transmició:",
      PLAYER_SETTINGS__MAIN_MENU_TITLE: "Configuració",
      PLAYER_SETTINGS__MENU_VIDEO_QUALITY_TITLE: "Qualitat de Vídeo",
      PLAYER_SETTINGS__MENU_VIDEO_QUALITY_OPTION_AUTO: "Auto",
      PLAYER_SETTINGS__MENU_SUBTITLES_TITLE: "Llenguatge de subtítols",
      PLAYER_SETTINGS__MENU_SUBTITLES_OPTION_NO_SUBTITLES: "Sense subtítols",
      PLAYER_SETTINGS__MENU_SOUNDTRACK_TITLE: "Soundtrack",
      PLAYER_SETTINGS__MENU_SOUNDTRACK_OPTION_NO_SOUNDTRACK:
        "No hi ha soundtrack",
      COMMON__YES: "Si",
      COMMON__NO: "No",
      COMMON__OK: "OK",
      COMMON__WATCH: "Veure",
      COMMON__ADD_TO_MY_LIST: "Afegeix a la meva llista",
      COMMON__REMOVE_FROM_MY_LIST: "Treure de la meva llista",
      COMMON__NO_INFORMATION: "No hi ha informació",
      CONNECTION_ERROR_INFO_TITLE:
        "S'ha produït un problema en carregar el contingut.",
      COMMON__WATCH_NEXT: "Veure següent",
      CONNECTION_ERROR_INFO_BUTTON: "Intentar una altra vegada",
      HELP_SETTINGS_SCREEN__TITLE: "Problemes a l'aplicació?",
      PRIVACY_POLICY_SETTINGS_SCREEN__TITLE: "Política de privadesa",
      MY_CONSENTS_SETTINGS_SCREEN__TITLE: "Els meus consentiments",
      MY_CONSENTS_BUTTON__ACCEPTED: "Acceptat",
      MY_CONSENTS_BUTTON__TO_ACCEPT: "Accepto",
      REGULATIONS_SETTINGS_SCREEN__TITLE: "Regulacions",
      ROLE: "Rol",
      SETTINGS_SCREEN__TITLE: "Configuració",
      SETTINGS_SCREEN__OPTION_ABOUT_TITLE: "Sobre",
      SETTINGS_SCREEN__OPTION_HELP_TITLE: "Problemes a l'aplicació?",
      SETTINGS_SCREEN__OPTION_MY_CONSENTS_TITLE: "Els meus consentiments",
      SETTINGS_SCREEN__OPTION_REGULATIONS_TITLE: "Regulació",
      SETTINGS_SCREEN__OPTION_PRIVACY_POLICY_TITLE: "Política de privadesa",
      EPISODES_NOT_FOUND: "Episodi no trobat",
      USER_BUY_ON_MOBILE_OR_WEB:
        "Inicia sessió al mòbil oa la web per comprar un producte",
      USER_IN_ASSET_EVENT_NAME: "Nom",
      TOKEN_VALID_INFO: "Token és vàlid per ",
      BUTTON_REFRESH_TOKEN: "Refrescar",
      VALIDATION__AVAILABILITY_STARTS_AT_START_DATE:
        "La data de disponibilitat s'ha de fixar abans de la data d'inici",
      VALIDATION__CATCHUP_DATE_SET_BEFORE_EVENT_ENDS:
        "L'hora d'inici s'ha de fixar almenys 2 hores després que finalitzi l'esdeveniment",
      VALIDATION__CATCHUP_DATE_SET_IN_THE_PAST:
        "La disponibilitat de l'esdeveniment no es pot fixar en el passat",
      VALIDATION__START_DATE_AFTER_END_DATE:
        "L'esdeveniment no es pot fixar després de la data de finalització",
      VALIDATION__START_DATE_IS_EQUAL_TO_END_DATE:
        "La data d'inici de l'esdeveniment no pot coincidir amb la data de finalització",
    },
    en: {
      LOGIN_INFO: "Go to {{LINK}}/link to login",
      LOGIN_INFO_LINK: "https://laxarxames.cat",
      LOGIN_LABEL: "Login",
      APP_CLOSE_DIALOG__TITLE: "Close application?",
      APP_CLOSE_DIALOG__MESSAGE: "Do you want to close the application?",
      APP_GLOBAL_ERROR_DIALOG__TITLE: "Error",
      CLOSE__APP: "Close Application",
      COMMON__INTERNET_CONNECTION_ERROR_TITLE: "No connection.",
      COMMON__INTERNET_CONNECTION_ERROR_MESSAGE:
        "No internet connection, please reconnect.",
      INCORRECT_FILE_TYPE: "Incorrect file type",
      LINK__BUTTON: "Link",
      LINK__ERROR_SHORT_MESSAGE:
        "The code you have entered is too short. Please fill up all inputs",
      LINK__ERROR_MESSAGE:
        "The code you have entered is incorrect. Please try again",
      LINK__SUCCESS_MESSAGE: "Your account has been linked",
      MENU_SEARCH: "Search",
      MENU_HOME: "Home",
      MENU_TRANSMISSIONS: "Broadcasts",
      MENU_RETRANSMISSIONS: "Retransmissions",
      MENU_CATEGORIES: "Categories",
      MENU_MY_LIST: "My list",
      MENU_SETTINGS: "Settings",
      MEDIA_PERSON_ROLE_DISPLAY_NAME: "Comment",
      MEDIA_PERSON_ROLE_DIRECTOR_LABEL: "Director:",
      MEDIA_PERSON_ROLE_WRITER_LABEL: "Writer:",
      MEDIA_PERSON_ROLE_CAST_LABEL: "Cast:",
      MEDIA_PERSON_ROLE_COMMENTATOR_LABEL: "Commentator:",
      MEDIA_LIST_ITEM_ONGOING_MARKER: "Ongoing",
      MEDIA_LIST_ITEM_YESTERDAY_MARKER: "Yesterday",
      MESSAGE__INCORRECT_OLD_PASSWORD: "Incorrect old password",
      PHONE_COUNTRY_CODE_VALIDATION_MESSAGE:
        "Country code with '+' sign is required (e.g. +48)",
      PHONE_LENGTH_VALIDATION_MESSAGE: "Maximum 15 characters",
      CATEGORY_LIST_TITLE_DEFAULT: "CATEGORY LIST (DEFAULT)",
      SEARCH__HEADER: "SEARCH RESULTS FOR:",
      SEARCH__RECOMMENDATION_LIST: "RECOMMENDED",
      SEARCH__INPUT_LABEL: "Search",
      SEARCH__NO_RESULTS_MESSAGE:
        "Sorry, we didn't find any results matching this search.",
      MY_LIST__NO_RESULTS_TITLE: "The list is empty",
      MY_LIST__NO_RESULTS_MESSAGE:
        "You haven't added any materials to your list yet.",
      RECOMMENDATIONS_LIST__TITLE: "See also",
      MOVIE_DETAILS__START_TRANSMISSION_TITLE: "Transmission start:",
      PLAYER_SETTINGS__MAIN_MENU_TITLE: "Settings",
      PLAYER_SETTINGS__MENU_VIDEO_QUALITY_TITLE: "Video quality",
      PLAYER_SETTINGS__MENU_VIDEO_QUALITY_OPTION_AUTO: "Auto",
      PLAYER_SETTINGS__MENU_SUBTITLES_TITLE: "Subtitle language",
      PLAYER_SETTINGS__MENU_SUBTITLES_OPTION_NO_SUBTITLES: "No subtitles",
      PLAYER_SETTINGS__MENU_SOUNDTRACK_TITLE: "Soundtrack",
      PLAYER_SETTINGS__MENU_SOUNDTRACK_OPTION_NO_SOUNDTRACK: "No soundtrack",
      COMMON__YES: "Yes",
      COMMON__NO: "No",
      COMMON__OK: "OK",
      COMMON__WATCH: "Watch",
      COMMON__ADD_TO_MY_LIST: "Add to my list",
      COMMON__REMOVE_FROM_MY_LIST: "Remove from my list",
      COMMON__NO_INFORMATION: "No information",
      CONNECTION_ERROR_INFO_TITLE: "There was a problem loading the content.",
      COMMON__WATCH_NEXT: "Watch next",
      CONNECTION_ERROR_INFO_BUTTON: "Try again",
      HELP_SETTINGS_SCREEN__TITLE: "Application problems?",
      PRIVACY_POLICY_SETTINGS_SCREEN__TITLE: "Privacy policy",
      MY_CONSENTS_SETTINGS_SCREEN__TITLE: "My consents",
      MY_CONSENTS_BUTTON__ACCEPTED: "Accepted",
      MY_CONSENTS_BUTTON__TO_ACCEPT: "Accept",
      REGULATIONS_SETTINGS_SCREEN__TITLE: "Regulations",
      ROLE: "Role",
      SETTINGS_SCREEN__TITLE: "Settings",
      SETTINGS_SCREEN__OPTION_ABOUT_TITLE: "About",
      SETTINGS_SCREEN__OPTION_HELP_TITLE: "Application problems?",
      SETTINGS_SCREEN__OPTION_MY_CONSENTS_TITLE: "My consents",
      SETTINGS_SCREEN__OPTION_REGULATIONS_TITLE: "Regulations",
      SETTINGS_SCREEN__OPTION_PRIVACY_POLICY_TITLE: "Privacy policy",
      EPISODES_NOT_FOUND: "Episodes not found",
      USER_BUY_ON_MOBILE_OR_WEB:
        "Please login on mobile or web to purchase a product",
      USER_IN_ASSET_EVENT_NAME: "Name",
      TOKEN_VALID_INFO: "Token is valid for ",
      BUTTON_REFRESH_TOKEN: "Refresh",
      VALIDATION__AVAILABILITY_STARTS_AT_START_DATE:
        "Availablity date must be set before start date",
      VALIDATION__CATCHUP_DATE_SET_BEFORE_EVENT_ENDS:
        "Start time should be set at least 2 hours after event ends",
      VALIDATION__CATCHUP_DATE_SET_IN_THE_PAST:
        "Event availability cannot be set in the past",
      VALIDATION__START_DATE_AFTER_END_DATE:
        "The event cannot be set after end date",
      VALIDATION__START_DATE_IS_EQUAL_TO_END_DATE:
        "The event start date cannot be the same as end date",
    },
  };

  initHttpFactory() {
    this.httpFactory.addRequestInterceptor(
      "HttpRequestInterceptor",
      HttpRequestFulfilledInterceptor,
      HttpRequestRejectedInterceptor
    );
    this.httpFactory.addResponseInterceptor(
      "HttpResponseInterceptor",
      HttpResponseFulfilledInterceptor,
      HttpResponseRejectedInterceptor
    );
  }

  async initSession() {
    const session = await StorageManager.getValue("session");

    if (!session) {
      dispatch(AuthStore.Actions.signInAnonymous());
    }
  }

  getDefaultBranding(): IConfigurationBrandingModel | undefined {
    return undefined;
  }

  getDefaultTranslations(): IConfigurationTranslationsModel | undefined {
    return this._defaultTranslations;
  }

  getResource(_resourceKey: string): any {
    return null;
  }

  async getCfgFromBackend(): Promise<IConfigurationModel | undefined> {
    const configuration = await this.configurationService
      .getConfiguration()
      .toPromise();
    if (configuration) {
      return DownloadAssetsService.downloadConfigAssets(configuration);
    } else return undefined;
  }

  async getConfiguration(
    isNewConfigAvailable?: boolean
  ): Promise<IConfigurationModel | undefined> {
    const configurationFromCache: IConfigurationModel =
      await StorageManager.getValue("configuration");
    if (configurationFromCache && !isNewConfigAvailable) {
      const configurationVersion = await this.configurationService
        .getCurrentConfigVersion()
        .toPromise();

      if (configurationFromCache.VersionNumber === configurationVersion) {
        return configurationFromCache;
      }
      return await this.getCfgFromBackend();
    }
    return await this.getCfgFromBackend();
  }

  async isNewConfigAvailable() {
    const configurationFromCache: IConfigurationModel =
      await StorageManager.getValue("configuration");

    if (!configurationFromCache) {
      return true;
    }

    const configurationVersion = await this.configurationService
      .getCurrentConfigVersion()
      .toPromise();

    if (configurationFromCache.VersionNumber === configurationVersion) {
      return false;
    }

    return true;
  }

  async getConfigurationOffline(): Promise<IConfigurationModel | undefined> {
    const configurationFromCache: IConfigurationModel =
      await StorageManager.getValue("configuration");
    if (configurationFromCache) {
      return configurationFromCache;
    }
    return undefined;
  }

  async getScreenConfiguration(
    _screenType: ScreenType,
    _screenId?: number
  ): Promise<IScreenModel | undefined> {
    return Promise.resolve(undefined);
  }

  async getMedia(options: IMediaOptionsModel): Promise<IMediaModel> {
    return this.mediaService.getMedia(options).toPromise();
  }

  async getMediaPlayInfo(
    options: IMediaPlayInfoOptionsModel
  ): Promise<IMediaPlayInfoModel> {
    return this.mediaService.getMediaPlayInfo(options).toPromise();
  }

  async searchMedia(
    filter: IMediaSearchFilterModel
  ): Promise<IMediaSearchStateModel> {
    return this.mediaService.searchMedia(filter).toPromise();
  }

  async getMediaList(
    options: IMediaListOptionsModel
  ): Promise<IMediaListModel> {
    const isAnonymous = await AuthorizationHelper.isAnonymous();

    if (options.Type === MediaListType.MyList && isAnonymous) {
      return this.getMyListIds()
        .then((ids) => this.searchMedia({ ...options, Ids: ids }))
        .then((searchResult) => {
          return {
            SourceType: SourceType.MediaList,
            Entities: searchResult.Entities,
            TotalCount: searchResult.TotalCount,
          } as IMediaListModel;
        });
    } else {
      return this.mediaService.getMediaList(options).toPromise();
    }
  }

  async getMediaCategories(): Promise<IMediaCategoryListModel> {
    return this.mediaService.getMediaCategories().toPromise();
  }

  async getTowns(): Promise<ITownsListModel> {
    return this.townsService.getTowns().toPromise();
  }

  // TODO Check if needed
  async getMediaStatistics(
    _options: IMediaStatisticsOptionsModel
  ): Promise<any> {
    return Promise.reject("Not implemented");
  }

  async getEpgDays(): Promise<EpgDay[]> {
    return [];
  }

  async selectMediaPurchaseOffers(
    mediaId: number
  ): Promise<IMediaPurchaseOfferModel[]> {
    return this.mediaService.selectMediaPurchaseOffers(mediaId).toPromise();
  }

  async getMediaChannelsForUser(
    onGoingNow: boolean
  ): Promise<Partial<IMediaChannelsForUserModel>[]> {
    return this.mediaService.getMediaChannelsForUser(onGoingNow).toPromise();
  }

  async getMediaChannelsForTown(
    townId: number,
    onGoingNow: boolean
  ): Promise<Partial<IMediaChannelsForUserModel>[]> {
    return this.mediaService
      .getMediaChannelsForTown(townId, onGoingNow)
      .toPromise();
  }

  async setWatchProgress(
    mediaId: number,
    progressInSeconds: number
  ): Promise<void> {
    const data = <IUserAssetPropertiesModel>{
      AssetId: Number(mediaId),
      Timestamp: {
        Hour: Math.floor(progressInSeconds / 3600),
        Minute: Math.floor((progressInSeconds % 3600) / 60),
        Second: Math.floor(progressInSeconds % 60),
      },
    };
    return AuthorizationHelper.isAnonymous().then((isAnonymous) => {
      if (isAnonymous) {
        return StorageHelper.updateUserAssetsProperties(data);
      } else {
        return this.userMediaPropertiesService
          .setProgress(data)
          .toPromise()
          .then(() => StorageHelper.updateUserAssetsProperties(data));
      }
    });
  }

  async getUserAssetsProperties(): Promise<IUserAssetPropertiesModel[]> {
    return this.userMediaPropertiesService.select().toPromise();
  }

  isOnMyList(mediaId: number): Promise<boolean> {
    return StorageHelper.isOnMyList(mediaId);
  }

  async addToMyList(mediaId: number): Promise<void> {
    return AuthorizationHelper.isAnonymous().then((isAnonymous) => {
      if (isAnonymous) {
        return StorageHelper.addToMyList(mediaId);
      } else {
        return this.userMediaPropertiesService
          .addToFavourites(mediaId)
          .toPromise()
          .then(() => StorageHelper.addToMyList(mediaId));
      }
    });
  }

  async removeFromMyList(mediaId: number): Promise<void> {
    return AuthorizationHelper.isAnonymous().then((isAnonymous) => {
      if (isAnonymous) {
        return StorageHelper.removeFromMyList(mediaId);
      } else {
        return this.userMediaPropertiesService
          .removeFromFavourites(mediaId)
          .toPromise()
          .then(() => StorageHelper.removeFromMyList(mediaId));
      }
    });
  }

  getMyListIds(): Promise<number[]> {
    return StorageHelper.getMyListIds();
  }

  async buyMedia(
    data: IMediaPaymentRequestModel
  ): Promise<IMediaPaymentResponseModel> {
    return this.mediaService.buy(data).toPromise();
  }

  async getProducts(): Promise<IUserProductModel[]> {
    return this.userService.getProducts().toPromise();
  }

  async searchMediaInMedia(
    filter: IMediaSearchMediaInMediaFilterModel
  ): Promise<IMediaListModel> {
    return this.mediaService.searchMediaInMedia(filter).toPromise();
  }

  async confirmRead(guid: string): Promise<IAuthResponseModel> {
    return this.notificationClient.confirmRead(guid).toPromise();
  }

  async signIn(data: IAuthRequestModel): Promise<IAuthResponseModel> {
    return this.authService.signIn(data).toPromise();
  }

  async signOut(device: IUserDeviceModel): Promise<IAuthResponseModel> {
    return this.authService.signOut(device).toPromise();
  }

  async forgotPassword(data: IForgotPasswordModel): Promise<boolean> {
    return this.registerService.forgotPassword(data).toPromise();
  }

  async resetForgotPassword(data: IResetForgotPasswordModel): Promise<boolean> {
    return this.registerService.resetForgotPassword(data).toPromise();
  }

  async registerEmail(data: IRegisterRequestEmailModel): Promise<boolean> {
    return this.registerService.registerEmail(data).toPromise();
  }

  async registerConfirmEmail(
    data: IRegisterConfirmEmailModel
  ): Promise<IAuthResponseModel> {
    return this.registerService.registerConfirmEmail(data).toPromise();
  }

  async registerConfirmAccount(
    data: IConfirmAccountWithPasswordModel
  ): Promise<IAuthResponseModel> {
    return this.registerService
      .registerConfirmAccountWithPassword(data)
      .toPromise();
  }

  async resendConfirmationEmailByUser(
    data: IResendConfirmationByUserModel
  ): Promise<void> {
    return this.userService.resendConfirmationEmailByUser(data).toPromise();
  }

  async refreshToken(
    refreshToken: string,
    device: IUserDeviceModel
  ): Promise<IAuthResponseModel> {
    return this.authService.refreshToken(refreshToken, device).toPromise();
  }

  async changePassword(
    data: IChangePasswordModel
  ): Promise<IAuthResponseModel> {
    return this.authService.changePassword(data).toPromise();
  }

  async resetPassword(data: IResetPasswordModel): Promise<boolean> {
    return this.registerService.resetPassword(data).toPromise();
  }

  async validateConfirmationToken(token: string): Promise<void> {
    return this.registerService.validateConfirmationToken(token).toPromise();
  }

  // LOGIN CODE
  async linkLoginCode(data: ILoginCodeModel): Promise<ILoginCodeModel> {
    return this.authService.linkLoginCode(data).toPromise();
  }

  async getLoginCode(): Promise<IAuthCodeRequestModel> {
    return this.authService.getLoginCode().toPromise();
  }

  async verifyLogin(data: IAuthVerifyLoginModel): Promise<IAuthResponseModel> {
    return this.authService.verifyLogin(data).toPromise();
  }

  // USER
  async getProfile(options: IUserRequestOptionsModel): Promise<IUserModel> {
    return this.userService.getProfile(options).toPromise();
  }

  async updateProfile(data: IUserModel): Promise<IUserModel> {
    return this.userService.updateProfile(data).toPromise();
  }

  async deleteAccount(data: IUserDeleteAccountRequestModel): Promise<void> {
    return this.userService.deleteAccount(data).toPromise();
  }

  async browseUsers(filter: IUsersSearchFilterModel): Promise<IUsersListModel> {
    return this.userService.browseUsers(filter).toPromise();
  }

  async getUserSettings(): Promise<IUserSettingsModel> {
    return this.userSettingsService.getUserSettings().toPromise();
  }

  async updateUserSettings(
    data: IUserSettingsModel
  ): Promise<IUserSettingsModel> {
    return this.userSettingsService.updateUserSettings(data).toPromise();
  }

  // USER IN ASSET

  async getUserInAssetRoles(): Promise<IUserInAssetRoleModel[]> {
    return this.userInAssetService.getUserInAssetRoles().toPromise();
  }

  async inviteManyUsers(users: IInviteManyUsersModel): Promise<void> {
    return this.userInAssetService.inviteManyUsers(users).toPromise();
  }

  async searchUsersInAsset(
    filter: IUsersInAssetSearchFilterModel
  ): Promise<IUsersInAssetListModel> {
    return this.userInAssetService.search(filter).toPromise();
  }

  async removeUserFromAsset(
    user: IUserInAssetModel & { AssetId: number }
  ): Promise<void> {
    return this.userInAssetService.removeUser(user).toPromise();
  }

  async removeManyUsersFromAsset(users: IRemoveManyUsersModel): Promise<void> {
    return this.userInAssetService.removeManyUsers(users).toPromise();
  }

  // CONSENTS
  async selectUserConsents(): Promise<IUserConsentModel[]> {
    return this.userConsentsService.select().toPromise();
  }

  async getUserConsent(url: string): Promise<string> {
    return this.userConsentsService.fetchConsent(url).toPromise();
  }

  async updateUserConsent(data: IUserConsentModel): Promise<IUserConsentModel> {
    return this.userConsentsService.update(data).toPromise();
  }

  async updateUserConsents(
    data: IUserConsentModel[]
  ): Promise<IUserConsentModel[]> {
    return this.userConsentsService.updateCollection(data).toPromise();
  }

  // PAYMENT
  async getPayment(id: number): Promise<IPaymentModel> {
    return this.paymentsService.get(id).toPromise();
  }

  async searchPayment(
    filter: IPaymentSearchFilterModel
  ): Promise<IPaymentListModel> {
    return this.paymentsService.search(filter).toPromise();
  }

  async getPaymentOptions(): Promise<IPaymentOptionsModel> {
    return this.paymentsService.options().toPromise();
  }

  async getPaymentTypeMappingAndOptions(): Promise<IPaymentTypeMappingAndOptionsModel> {
    return this.paymentsService.paymentTypeMappingAndOptions().toPromise();
  }

  async getByKey(key: string): Promise<IPaymentModel> {
    return this.paymentsService.getByKey(key).toPromise();
  }

  async checkStatusByKey(key: string): Promise<IPaymentStatusModel> {
    return this.paymentsService.checkStatusByKey(key).toPromise();
  }

  // SUBSCRIPTIONS
  async cancelSubscription(
    userSubscriptionId: number
  ): Promise<IUserAssetPurchasesListModel> {
    return this.userAssetPurchasesService
      .cancelSubscription(userSubscriptionId)
      .toPromise();
  }

  async reactivateSubscription(
    userSubscriptionId: number
  ): Promise<IUserAssetPurchasesListModel> {
    return this.userAssetPurchasesService
      .reactivateSubscription(userSubscriptionId)
      .toPromise();
  }

  async changeSubscriptionPaymentMethod(
    userSubscriptionId: number
  ): Promise<IMediaPaymentResponseModel> {
    return this.userAssetPurchasesService
      .changeSubscriptionPaymentMethod(userSubscriptionId)
      .toPromise();
  }

  async searchUserAssetPurchases(
    filter: IUserAssetPurchasesSearchFilterModel
  ): Promise<IUserAssetPurchasesListModel> {
    return this.userAssetPurchasesService.search(filter).toPromise();
  }

  //ASSETS
  async searchAsset(filter: IAssetSearchFilterModel): Promise<IAssetListModel> {
    return this.assetService.search(filter).toPromise();
  }

  async getUserPurchasesAggregated(): Promise<IUserPurchasesAggregatedModel> {
    return this.userAssetPurchasesService
      .getUserPurchasesAggregated()
      .toPromise();
  }

  async createAsset(
    asset: IInsertAssetRequestModel
  ): Promise<IInsertAssetResponseModel> {
    return this.assetService.create(asset).toPromise();
  }

  async getAsset(assetId: number): Promise<IAssetModel> {
    return this.assetService.getAsset(assetId).toPromise();
  }

  async updateAsset(asset: IAssetModel): Promise<any> {
    return this.assetService.updateAsset(asset).toPromise();
  }

  async insertAssetImage(image: IAssetImageModel): Promise<IAssetModel> {
    return this.assetService.addAssetImage(image).toPromise();
  }

  async updateAssetImage(image: IAssetImageModel): Promise<IAssetModel> {
    return this.assetService.updateAssetImage(image).toPromise();
  }

  async addAssetContent(
    assetContent: IAssetContentModel
  ): Promise<IAssetContentModel> {
    return this.assetService.addAssetContent(assetContent).toPromise();
  }

  async updateAssetContent(
    assetContent: IAssetContentModel
  ): Promise<IAssetContentModel> {
    return this.assetService.updateAssetContent(assetContent).toPromise();
  }

  async selectAgeRestriction(): Promise<IAssetAgeRestrictionModel[]> {
    return this.assetService.getAssetAgeRestriction().toPromise();
  }

  async selectCurrency(): Promise<ICurrencyModel[]> {
    return this.currenciesService.select().toPromise();
  }

  async selectPurchasePeriodType(): Promise<IAssetPurchasePeriodTypeModel[]> {
    return this.assetPurchasePeriodTypeService.select().toPromise();
  }

  async saveAssetInAssetCollection(
    data: IAssetInAssetModel[]
  ): Promise<IAssetInAssetModel[]> {
    return this.assetInAssetService.saveCollection(data).toPromise();
  }

  async saveAssetPriceCollection(
    data: IAssetPriceModel[]
  ): Promise<IAssetPriceModel[]> {
    return this.assetPriceService.saveCollection(data).toPromise();
  }

  async getAssetPriceCollection(assetId: number): Promise<IAssetPriceModel> {
    return this.assetPriceService.get(assetId).toPromise();
  }

  async searchAssetPriceCollection(
    filter: IAssetPriceSearchFilterModel
  ): Promise<IAssetPriceListModel> {
    return this.assetPriceService.search(filter).toPromise();
  }

  async insertCatchup(
    data: ICatchupInsertModel
  ): Promise<ICatchupInsertResponseModel> {
    return this.assetService.insertCatchup(data).toPromise();
  }

  async searchAssetsInAssets(
    data: IAssetsInAssetSearchFilterModel
  ): Promise<IAssetInAssetSearchResponseModel> {
    return this.assetInAssetService.searchAssetsInAssets(data).toPromise();
  }

  async sendAnalyticsMarker(data: IAnalyticsMarkerModel): Promise<null> {
    return this.analyticsService.sendAnalyticsMarker(data).toPromise();
  }

  async getMediaChannelPrograms(
    options: IMediaChannelProgramOptionsModel
  ): Promise<IMediaListModel> {
    return this.mediaService.getMediaChannelPrograms(options).toPromise();
  }
}
