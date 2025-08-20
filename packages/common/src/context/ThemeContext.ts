/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import Color from "color";
import { createContext, useContext } from "react";
import { BehaviorSubject } from "rxjs";

import { PlatformType } from "../enums";
import {
  IConfigurationBrandingModel,
  IConfigurationModel,
  IListComponentItemPlaceholder,
} from "../models";
import { DataProvider } from "../providers/DataProvider";

const DEFAULT_BRANDING_KEY = "MAIN";

interface IStringKeyAndValues {
  [key: string]: string;
}

const fontKeyToNameMap: IStringKeyAndValues = {
  ABRADE: "Abrade, sans-serif",
  ARIAL: "Arial",
  MONTSERRAT: "Montserrat",
  TAHOMA: "Tahoma",
  TIMES_NEW_ROMAN: "Times New Roman",
  VERDANA: "Verdana",
  ROBOTO: "Roboto",
  BR_SONOMA: "BR Sonoma",
};

const defaultBranding: IConfigurationBrandingModel = {
  Id: DEFAULT_BRANDING_KEY,
  AppBackgroundColor: "#2A2F36ff",
  AppCellsBackgroundColor: "#0E0F11ff",
  AppFontFamily: fontKeyToNameMap.BR_SONOMA,
  AppFontSize: 16,
  AppPrimaryColor: "#3F8DEAFF",
  AppPrimaryTextColor: "#EEEEEEff",
  AppSecondaryColor: "#3F8DEAff",
  AppSecondaryTextColor: "#F5F5F5ff",
  AppAlertColor: "#F45252",
  FooterBackgroundColor: "#3F8DEAff",
  FooterLinkColor: "#EEEEEEff",
  FooterLinkHoverColor: "#000000ff",
  HeaderBackgroundColor: "#000000ff",
  HeaderLinkColor: "#F5F5F5ff",
  HeaderLinkHoverColor: "#3F8DEAff",
  MobileGrandientColor: "#00000099",
  MobileHeaderLogoUrl:
    "https://d1n3vpqjhjvv6k.cloudfront.net/ApplicationConfiguration/6a0b294608584198b8f40608f33c6012/logo.png",
};

const template1: IConfigurationBrandingModel = Object.assign(
  {},
  defaultBranding,
  {
    Id: DEFAULT_BRANDING_KEY,
    AppPaddingTop: 100,
    AppPaddingRight: 62,
    AppPaddingBottom: 64,
    AppPaddingLeft: 55,
    AppListPaddingTop: 70,
    AppListPaddingBottom: 70,
    AppMenuPaddingTop: 50,
    AppListItemPaddingHorizontal: 20,
  }
);

const templateTV: IConfigurationBrandingModel = Object.assign(
  {},
  defaultBranding,
  {
    Id: DEFAULT_BRANDING_KEY,
    AppPaddingTop: 50,
    AppPaddingRight: 40,
    AppPaddingBottom: 64,
    AppPaddingLeft: 40,
    AppListPaddingTop: 35,
    AppListPaddingBottom: 35,
    AppMenuPaddingTop: 12,
    AppListItemPaddingHorizontal: 20,
  }
);

const templateSmartTV: IConfigurationBrandingModel = Object.assign(
  {},
  defaultBranding,
  {
    Id: DEFAULT_BRANDING_KEY,
    AppTemplate: "APP_VERTICAL_MENU",
    AppFontFamily: "Source Sans Pro",
    AppPaddingTop: 50,
    AppPaddingRight: 90,
    AppPaddingBottom: 64,
    AppPaddingLeft: 10,
    AppListPaddingTop: 32,
    AppListPaddingBottom: 35,
    AppMenuPaddingTop: 25,
    AppListItemPaddingHorizontal: 37,
    AppListGap: 32,
    AppMenuWidth: 160,
    //TO DO: implement in studio seperate AppMenu background color, for now we use HeaderBackgroundColor
    // AppMenuBackgroundColor: "#18161F",
    AppBackgroundColor: "#18161F",
    AppCellsBackgroundColor: "#383346",
    AppButtonBackgroundColor: "#5b5865",
    AppPrimaryColor: "#EAFF00",
    AppPrimaryTextColor: "#fff",
    AppSecondaryTextColor: "#38324C",
    AppAccentColor: "#D50909",
    HeaderBackgroundColor: "#ffffffff",
    IsDefault: true,
  }
);

const templateMobile: IConfigurationBrandingModel = Object.assign(
  {},
  defaultBranding,
  {
    Id: DEFAULT_BRANDING_KEY,
    AppPaddingTop: 50,
    AppPaddingRight: 10,
    AppPaddingBottom: 110,
    AppPaddingLeft: 5,
    AppListPaddingTop: 35,
    AppListPaddingBottom: 35,
    AppMenuPaddingTop: 25,
    AppListItemPaddingHorizontal: 5,
  }
);

enum ScreenWidth {
  SD = 640,
  HD = 1280,
  FHD = 1920,
  UHD = 3860,
}

export class ThemeProvider {
  private defaultBrandingKey: string = DEFAULT_BRANDING_KEY;

  private defaultBranding: IConfigurationBrandingModel = template1;

  private branding: IConfigurationBrandingModel = template1;

  private brandings: { [key: string]: IConfigurationBrandingModel } = {};

  private _brandingSource = new BehaviorSubject<IConfigurationBrandingModel>(
    template1
  );

  public branding$ = this._brandingSource.asObservable();

  public setDefaultBranding(branding?: IConfigurationBrandingModel) {
    if (branding) {
      this.defaultBranding = branding;
      this.branding = Object.assign({}, this.defaultBranding);
    }
  }

  public setBrandings(
    configuration?: IConfigurationModel,
    platformType?: PlatformType
  ) {
    const appId = configuration && configuration.Id ? configuration.Id : -1;

    if (!platformType) {
      platformType = PlatformType.Web;
    }

    switch (appId) {
      default:
        switch (platformType) {
          case PlatformType.AndroidPhone:
          case PlatformType.AndroidTablet:
          case PlatformType.iOSPhone:
          case PlatformType.iPad:
            this.defaultBranding = templateMobile;
            break;
          case PlatformType.AndroidTV:
          case PlatformType.AppleTV:
            this.defaultBranding = templateTV;
            break;
          case PlatformType.Tizen:
          case PlatformType.WebOS:
            this.defaultBranding = templateSmartTV;
            break;
          default:
            this.defaultBranding = template1;
            break;
        }
        break;
    }

    if (configuration && configuration.Brandings) {
      for (const brandingKey in configuration.Brandings) {
        const brandingData = configuration.Brandings[brandingKey];

        this.brandings[brandingKey] = brandingData;

        if (brandingData.IsDefault) {
          this.defaultBrandingKey = brandingKey;
          this.defaultBranding = Object.assign(
            {},
            this.defaultBranding,
            brandingData
          );
        }
      }
    } else if (configuration && configuration.Branding) {
      this.defaultBranding = Object.assign(
        {},
        this.defaultBranding,
        configuration.Branding
      );

      this.brandings[this.defaultBrandingKey] = configuration.Branding;
    }

    this.branding = Object.assign({}, this.defaultBranding);
  }

  public setCurrentBranding(brandingId?: string): boolean {
    const brandingKey = brandingId ?? this.defaultBrandingKey;

    if (this.branding.Id !== brandingKey) {
      const brandingData = this.brandings[brandingKey];

      if (brandingData) {
        this.branding = Object.assign({}, this.defaultBranding, brandingData);
        this._brandingSource.next(this.branding);
        return true;
      }
    }

    return false;
  }

  public getCurrentBrandingId(): string {
    return this.branding.Id || this.defaultBrandingKey;
  }

  public getBranding(): IConfigurationBrandingModel {
    return this.branding;
  }

  public getVODItemActiveStyle = () => {
    return {
      backgroundColor: this.getColor("AppPrimaryColor"),
    };
  };

  public getVODItemStyle = () => {
    return {
      backgroundColor: this.getColor("AppCellsBackgroundColor"),
    };
  };

  public getVODItemCategoryStyle = () => {
    return {
      color: this.getColor("AppSecondaryTextColor"),
    };
  };

  public getHeaderStyle = () => {
    return {
      color: this.getColor("AppPrimaryTextColor"),
    };
  };

  public getMenuItemStyle = () => {
    return {
      color: this.getColor("AppPrimaryTextColor"),
      backgroundColor: this.getColor("AppCellsBackgroundColor"),
    };
  };

  public getMenuItemSelectedStyle = () => {
    return {
      backgroundColor: this.getColor("AppPrimaryColor"),
      color: this.getColor("AppPrimaryTextColor"),
    };
  };

  public getAppStyle = () => {
    return {
      color: this.getColor("AppPrimaryTextColor"),
      backgroundColor: this.getColor("AppBackgroundColor"),
    };
  };

  public getDetailsBarsStyle = () => {
    return {
      backgroundColor: this.getColor("AppBackgroundColor"),
    };
  };

  public getDetailsInfoStyle = () => {
    return {
      color: this.getColor("AppPrimaryTextColor"),
    };
  };

  public getDetailsInfoCategoryStyle = () => {
    return {
      color: this.getColor("AppSecondaryTextColor"),
    };
  };

  public getButtonFocusStyle = () => {
    return {
      color: this.getColor("AppPrimaryTextColor"),
      backgroundColor: this.getColor("AppPrimaryColor"),
    };
  };

  public getButtonNoFocusStyle = () => {
    return {
      color: this.getColor("AppPrimaryTextColor"),
      backgroundColor: this.getColor("AppCellsBackgroundColor"),
    };
  };

  public getCarouselDotStyle = () => {
    return {
      backgroundColor: this.getColor("AppPrimaryTextColor"),
    };
  };

  public getCarouselActiveDotStyle = () => {
    return {
      backgroundColor: this.getColor("AppSecondaryColor"),
    };
  };

  public getSelectedIndicatorStyle = () => {
    return {
      backgroundColor: this.getColor("AppPrimaryColor"),
    };
  };

  public getSkeletonPrimaryStyle = () => {
    return {
      backgroundColor: this.getColor("AppCellsBackgroundColor"),
    };
  };

  public getSkeletonColor = () => {
    return Color(this.getColor("AppCellsBackgroundColor")).darken(0.2).hex();
  };

  public getWebHeaderLogoUrl = () => {
    if (this.branding.WebHeaderLogoResourceKey) {
      return DataProvider.getResource(this.branding.WebHeaderLogoResourceKey);
    }

    return this.branding.WebHeaderLogoUrl;
  };

  public getSmartTVLogoUrl = () => {
    return this.branding.WebHeaderLogoUrl;
  };

  public getMobileHeaderLogoUrl = () => {
    return this.branding.MobileHeaderLogoUrl;
  };

  public getAppMenuBackgroundUrl = () => {
    return this.branding.AppMenuBackgroundUrl;
  };

  public getAppAplaBackgroundUrl = () => {
    return this.branding.AppAplaBackgroundUrl;
  };

  public getAppBackgroundUrl = () => {
    return this.branding.AppBackgroundUrl;
  };

  public getAppLogoUrl = () => {
    if (this.branding.WebHeaderLogoResourceKey) {
      return DataProvider.getResource(this.branding.WebHeaderLogoResourceKey);
    }

    return this.branding.WebHeaderLogoUrl;
  };

  public getAppAdsBannerUrl = () => {
    return this.branding.AppAdsBannerUrl;
  };

  public getColor(key: keyof IConfigurationBrandingModel) {
    let value = <string>this.branding[key];

    if (value && value.length > 7) {
      value = value.substring(0, 7);
    }

    return value;
  }

  public getDimension(
    key:
      | "AppPaddingTop"
      | "AppPaddingRight"
      | "AppPaddingBottom"
      | "AppPaddingLeft"
      | "AppListPaddingTop"
      | "AppListPaddingBottom"
      | "AppMenuPaddingTop"
      | "AppListItemPaddingHorizontal"
      | "AppMenuWidth"
  ) {
    const value = <number>this.branding[key];

    return `${value}px`;
  }

  public getListItemCountFactor(itemCount: number) {
    switch (itemCount) {
      case 1:
        return 2;
      case 2:
        return 1.8;
      case 3:
        return 1.4;
      case 4:
        return 1;
      case 5:
        return 0.8;
      case 6:
        return 0.6;
      default:
        return 1;
    }
  }

  public getResolutionFactor() {
    const { width } = this.getDocumentSize();
    let factor;

    if (width <= ScreenWidth.SD) {
      factor = 0.5;
    } else if (width <= ScreenWidth.HD) {
      factor = 0.7;
    } else if (width <= ScreenWidth.FHD) {
      factor = 1;
    } else {
      factor = 1.25;
    }

    return factor;
  }

  public getFontFamily() {
    let fontFamily;

    if (this.branding.AppFontFamily) {
      fontFamily = fontKeyToNameMap[this.branding.AppFontFamily];
    }

    return fontFamily || fontKeyToNameMap.BR_SONOMA;
  }

  public getFontSize() {
    const baseFontSize = this.branding.AppFontSize || 16;
    const factor = this.getResolutionFactor();

    return baseFontSize * factor;
  }

  public getDocumentSize() {
    const documentElementHeight = document.documentElement
      ? document.documentElement.clientHeight
      : 0;
    const documentElementWidth = document.documentElement
      ? document.documentElement.clientWidth
      : 0;

    return {
      height: document.body
        ? document.body.clientHeight
        : documentElementHeight,
      width: document.body ? document.body.clientWidth : documentElementWidth,
    };
  }

  public getListComponentItemPlaceholder(): IListComponentItemPlaceholder {
    return {
      Type: this.branding.AppListItemPlaceholderType ?? "IMAGE",
      Value: this.branding.AppListItemPlaceholderValue,
    };
  }

  public getAppLoginImageUrl = () => {
    return this.branding.LoginImageUrl;
  };

  public getAppRegisterImageUrl = () => {
    return this.branding.RegisterImageUrl;
  };
}

export interface IThemeContext {
  themeProvider: ThemeProvider;
  onBrandingChange?: (brandingId?: string) => void;
}

export const ThemeContext = createContext<IThemeContext>({
  themeProvider: new ThemeProvider(),
});

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme?.themeProvider) {
    throw new Error(`useTheme must be used within the ThemeContext`);
  }

  return theme.themeProvider;
};
