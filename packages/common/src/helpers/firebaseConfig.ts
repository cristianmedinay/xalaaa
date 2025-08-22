/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IDidomiObject } from "@didomi/react";
import {
  Analytics,
  getAnalytics,
  isSupported,
  setConsent,
} from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const firebaseAuthDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const firebaseProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const firebaseStorageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const firebaseMessagingSenderId =
  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId = process.env.REACT_APP_FIREBASE_APP_ID;
const firebaseMeasurementId = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;

let analytics: Analytics | null = null;

const allVariablesSetUp =
  firebaseApiKey &&
  firebaseAuthDomain &&
  firebaseProjectId &&
  firebaseStorageBucket &&
  firebaseMessagingSenderId &&
  firebaseAppId;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
  measurementId: firebaseMeasurementId,
};

export const initializeAnalytics = async (didomi: IDidomiObject) => {
  const isAnalyticsSupported = await isSupported();
  if (isAnalyticsSupported && allVariablesSetUp) {
    const app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);

    const analyticsStorageGranted =
      didomi.getUserConsentStatus("measure_content_performance", "google") ||
      didomi.getUserConsentStatus("measure_ad_performance", "google");
    const adStorageGranted = didomi.getUserConsentStatus(
      "create_ads_profile",
      "google"
    );
    const adUserDataGranted =
      didomi.getUserConsentStatus("create_content_profile", "google") ||
      didomi.getUserConsentStatus(
        "use_limited_data_to_select_content",
        "google"
      );
    const adPersonalizationGranted =
      didomi.getUserConsentStatus("select_personalized_ads", "google") ||
      didomi.getUserConsentStatus("select_basic_ads", "google");

    setConsent({
      ad_storage: adStorageGranted ? "granted" : "denied",
      analytics_storage: analyticsStorageGranted ? "granted" : "denied",
      ad_user_data: adUserDataGranted ? "granted" : "denied",
      ad_personalization: adPersonalizationGranted ? "granted" : "denied",
    });
  }
};

export const updateFirebaseConsent = (didomi: IDidomiObject) => {
  if (!analytics) {
    console.warn("Firebase Analytics not initialized yet.");
    return;
  }

  // Mapea los propósitos de Didomi a los tipos de consentimiento de Firebase
  const analyticsStorageGranted =
    didomi.getUserConsentStatus("measure_content_performance", "google") ||
    didomi.getUserConsentStatus("measure_ad_performance", "google");
  const adStorageGranted = didomi.getUserConsentStatus(
    "create_ads_profile",
    "google"
  );
  const adUserDataGranted =
    didomi.getUserConsentStatus("create_content_profile", "google") ||
    didomi.getUserConsentStatus("use_limited_data_to_select_content", "google");
  const adPersonalizationGranted =
    didomi.getUserConsentStatus("select_personalized_ads", "google") ||
    didomi.getUserConsentStatus("select_basic_ads", "google");

  // Llama a setConsent de Firebase Analytics
  setConsent({
    ad_storage: adStorageGranted ? "granted" : "denied",
    analytics_storage: analyticsStorageGranted ? "granted" : "denied",
    ad_user_data: adUserDataGranted ? "granted" : "denied",
    ad_personalization: adPersonalizationGranted ? "granted" : "denied",
  });
};

export const firebaseAnalytics = analytics;
