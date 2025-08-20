/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface IConfigurationBrandingModel {
  Id?: string;

  AppTemplate?: "APP_VERTICAL_MENU" | "APP_HORIZONTAL_MENU";

  WebHeaderLogoUrl?: string;

  WebHeaderLogoResourceKey?: string;

  WebFooterLogoUrl?: string;

  WebFooterLogoResourceKey?: string;

  MobileHeaderLogoUrl?: string;

  MobileHeaderLogoResourceKey?: string;

  MobileFooterLogoUrl?: string;

  MobileFooterLogoResourceKey?: string;

  LoginImageUrl?: string;

  RegisterImageUrl?: string;

  AppPrimaryColor?: string;

  AppSecondaryColor?: string;

  AppPrimaryTextColor?: string;

  AppSecondaryTextColor?: string;

  AppAccentColor?: string;

  AppAlertColor?: string;

  AppBackgroundColor?: string;

  AppBackgroundUrl?: string;

  AppAplaBackgroundUrl?: string;

  AppCellsBackgroundColor?: string;

  AppButtonBackgroundColor?: string;

  AppFontFamily?: string;

  AppFontSize?: number;

  HeaderBackgroundColor?: string;

  HeaderLinkColor?: string;

  HeaderLinkHoverColor?: string;

  MobileGrandientColor?: string;

  FooterBackgroundColor?: string;

  FooterLinkColor?: string;

  FooterLinkHoverColor?: string;

  AppPaddingTop?: number;

  AppPaddingRight?: number;

  AppPaddingBottom?: number;

  AppPaddingLeft?: number;

  AppListGap?: number;

  AppListPaddingTop?: number;

  AppListPaddingBottom?: number;

  AppMenuPaddingTop?: number;

  AppMenuBackgroundUrl?: string;

  AppMenuBackgroundColor?: string;

  AppMenuWidth?: number;

  AppListItemPaddingHorizontal?: number;

  AppListItemPlaceholderType?: "COLOR" | "GRADIENT" | "IMAGE" | "SPINNER";

  AppListItemPlaceholderValue?: string;

  AppAdsBannerUrl?: string;

  AppDetailsBackgroundColor?: string;

  IsDefault?: boolean;
}
