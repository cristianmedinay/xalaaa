/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface IConfigurationTranslationsModel {
  [language: string]: {
    [translationKey: string]: string;
  };
}
