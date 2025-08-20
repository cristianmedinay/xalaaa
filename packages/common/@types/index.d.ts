/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
interface Window {
  PalmSystem: any;

  Didomi?: DidomiSdk;

  tizen: any;

  webOS: any;

  localStorage: any;

  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;

  __tcfapi: Function;

  didomiEventListeners: any;

  didomiOnReady: any;

  didomiConfig: any;

  didomiState: any;

  DidomiSanitizing: any;

  didomiRemoteConfig: any;

  dataLayer?: Record<string, any>[];
}

declare global {
  interface Window {
    PalmSystem: any;

    tizen: any;

    webOS: any;

    localStorage: any;

    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;

    __tcfapi: Function;

    didomiEventListeners: any;

    didomiOnReady: any;

    didomiConfig: any;

    didomiState: any;

    DidomiSanitizing: any;

    didomiRemoteConfig: any;

    Didomi: DidomiSdk;

    dataLayer?: Record<string, any>[];
  }
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare let AWS: any;

interface DidomiSdk {
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback: (...args: any[]) => void) => void;
  getUserConsent: () => {
    purposes: string[];
    vendors: string[];
  };
  getUserConsentForPurpose: (purposeId: string) => boolean;
  getUserConsentForVendor: (vendorId: string) => boolean;
}
