/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IConfigurationBrandingModel } from "./IConfigurationBrandingModel";
import { IConfigurationTranslationsModel } from "./IConfigurationTranslationsModel";
import { ILanguageModel } from "./ILanguageModel";
import { ISourceModel } from "./ISourceModel";
import { ScreenModel } from "./ScreenModel";

export interface IConfigurationModel {
  Id?: number;

  Guid?: string;

  VersionNumber?: number;

  Description?: string;

  Screens?: {
    CUSTOM: { [key: string]: ScreenModel };

    [key: string]: ScreenModel;
  };

  Branding?: IConfigurationBrandingModel;

  Brandings?: {
    [key: string]: IConfigurationBrandingModel;
  };

  Translations?: IConfigurationTranslationsModel;

  Sources?: { [key: string]: ISourceModel };

  Languages?: ILanguageModel[];
}
