/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

interface Translations {
  [language: string]: {
    [translationKey: string]: string;
  };
}

const DEFAULT_LANGUAGE_CODE = "cat";

// noinspection JSIgnoredPromiseFromCall
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we want to force to default language even if i18n detect other
    // supported language
    lng: localStorage.getItem("i18nextLng") || DEFAULT_LANGUAGE_CODE,
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    partialBundledLanguages: true,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
  });

export const initTranslations = (translations: Translations | undefined) => {
  if (!translations) {
    return;
  }

  // register language bundles and get supported languages
  const supportedLanguages = Object.entries(translations).map(
    ([language, translations]) => {
      i18n.addResourceBundle(language, "translation", translations);
      return language;
    }
  );

  // change to supported language
  const currentLanguage = i18n.language.split("-")[0];
  const language = supportedLanguages.includes(currentLanguage)
    ? currentLanguage
    : DEFAULT_LANGUAGE_CODE;

  // noinspection JSIgnoredPromiseFromCall
  i18n.changeLanguage(language);
};

export default i18n;
