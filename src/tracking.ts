/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { logEvent } from "firebase/analytics";
import ReactGA from "react-ga";

import { firebaseAnalytics } from "@xala/common";

const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
const trackingEnabled = trackingId !== undefined && trackingId.length > 0;

export const initGA = () => {
  if (trackingEnabled) {
    ReactGA.initialize(trackingId as string, {
      debug: import.meta.env.DEV,
      titleCase: false,
    });
  }
};

export const trackPageView = () => {
  if (trackingEnabled) {
    ReactGA.set({
      page: window.location.pathname + window.location.search,
    });

    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  if (firebaseAnalytics) {
    logEvent(firebaseAnalytics, "screen_view");
    logEvent(firebaseAnalytics, "page_view", {
      page_location: window.location.href,
    });
  }
};

export const trackEvent = (category: string, action: string, label: string) => {
  if (trackingEnabled) {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  }

  if (firebaseAnalytics) {
    logEvent(firebaseAnalytics, action, {
      category,
      label,
    });
  }
};
