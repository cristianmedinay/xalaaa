/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ActionType, ScreenType } from "../enums";
import {
  IApplicationMenuItemComponentModel,
  IConfigurationModel,
  IScreenModel,
} from "../models/Configuration";

export class ConfigurationHelper {
  static getScreenByType(
    configuration: IConfigurationModel | undefined,
    screenType: ScreenType
  ) {
    let screen: IScreenModel = {};

    if (configuration && configuration.Screens) {
      const screenExists = Object.keys(configuration.Screens).includes(
        screenType
      );

      if (!screenExists) {
        console.error(`Screen ${screenType} does not exists in configuration`);
        return screen;
      }

      screen = configuration.Screens[screenType];
    }

    return screen;
  }

  static getScreenRouteKey(screen: IScreenModel) {
    switch (screen.ScreenTypeCode) {
      case ScreenType.Custom:
        return `${screen.Name?.toLowerCase().replace(/\s+/g, "-")}`;
      default:
        return `${screen.ScreenTypeCode?.toLowerCase().replace(/\s+/g, "-")}`;
    }
  }

  static getScreenByRouteKey(
    configuration: IConfigurationModel | undefined,
    routeKey: string
  ): IScreenModel | undefined {
    let screen: IScreenModel | undefined = undefined;

    if (configuration && configuration.Screens) {
      screen = configuration.Screens[routeKey.toUpperCase()];

      if (!screen && configuration.Screens.CUSTOM) {
        for (const element in configuration.Screens.CUSTOM) {
          if (
            configuration.Screens.CUSTOM[element].Name?.toLowerCase().replace(
              /\s+/g,
              "-"
            ) === routeKey.toLowerCase()
          ) {
            screen =
              configuration.Screens.CUSTOM[element] ||
              configuration.Screens.CUSTOM[routeKey];
          }
        }
      }
    }

    return screen;
  }

  static getScreenById(
    configuration: IConfigurationModel | undefined,
    screenId: number
  ): IScreenModel | undefined {
    const scrrenKey = `${screenId}`;

    return this.getScreenByRouteKey(configuration, scrrenKey);
  }

  static getApplicationMenuItemScreenKey(
    component: Pick<IApplicationMenuItemComponentModel, "Action">
  ) {
    return component?.Action?.ActionType === ActionType.OpenScreen
      ? component?.Action?.ScreenName
        ? `${component?.Action?.ScreenName.toLowerCase().replace(/\s+/g, "-")}`
        : `${component?.Action?.ScreenTypeCode?.toLowerCase().replace(
            "_",
            "-"
          )}`
      : "";
  }
}
