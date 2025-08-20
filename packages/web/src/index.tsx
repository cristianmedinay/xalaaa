/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { DataProvider, ReduxStoreConfigurator } from "@xala/common";
// // BROWSER POLYFILLS
import "core-js/es6/array";
import "core-js/es6/date";
import "core-js/es6/function";
import "core-js/es6/map";
import "core-js/es6/math";
import "core-js/es6/number";
import "core-js/es6/object";
import "core-js/es6/parse-float";
import "core-js/es6/parse-int";
import "core-js/es6/promise";
import "core-js/es6/reflect";
import "core-js/es6/regexp";
import "core-js/es6/set";
import "core-js/es6/string";
import "core-js/es6/symbol";
import "core-js/es6/weak-map";
import "core-js/fn/array/flat-map";
import dayjs from "dayjs";
import "dayjs/locale/en";
import {
  BrowserHistoryBuildOptions,
  createBrowserHistory,
  History,
} from "history";
import "intersection-observer";
import React, { useEffect } from "react";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import { render } from "react-dom";
import { Provider, ReactReduxContext } from "react-redux";
import { createLogger } from "redux-logger";

import { initGA, trackPageView } from "tracking";

import "./i18n";
import { Root } from "./screens";

dayjs.locale("en");

// Set up HttpFactory
DataProvider.initHttpFactory();

const browserHistoryOptions: BrowserHistoryBuildOptions = {};

if (process.env.PUBLIC_URL) {
  browserHistoryOptions.basename = process.env.PUBLIC_URL;
}

const appHistory: History<any> = createBrowserHistory(browserHistoryOptions);
const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(createLogger({ diff: true, collapsed: true }));
}
const reduxStoreConfigurator = new ReduxStoreConfigurator(
  appHistory,
  middlewares
);
const appStore = reduxStoreConfigurator.initStore();

function InitApp() {
  useEffect(() => {
    initGA();
    trackPageView();

    appHistory.listen(trackPageView);
  }, []);
  return (
    <Provider store={appStore} context={ReactReduxContext}>
      <Root history={appHistory} />
    </Provider>
  );
}

/**
 * used to show components that just been refreshed
 */
if (
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_OPTIMIZATION === "true"
) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React);
}

window.onload = () => render(<InitApp />, document.getElementById("root"));
