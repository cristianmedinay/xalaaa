/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_PATH = path.resolve(__dirname, '../public/.well-known');
const ANDROID_PACKAGE_NAME = process.env.VITE_ANDROID_PACKAGE_NAME;
const SIGNING_KEY_SHA256 = process.env.VITE_SIGNING_KEY_SHA256;
const APP_IDENTIFIER_PREFIX = process.env.VITE_APPLICATION_IDENTIFIER_PREFIX;
const BUNDLE_IDENTIFIER = process.env.VITE_BUNDLE_IDENTIFIER;

fs.mkdirSync(PUBLIC_PATH, { recursive: true });

const assetLinksJson = [{
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: `${ANDROID_PACKAGE_NAME}`,
      sha256_cert_fingerprints: [
        `${SIGNING_KEY_SHA256}`
      ]
    }
  }]

const appleAppSiteAssociation = {
  applinks: {
    apps: [],
    details: [
      {
        appID: `${APP_IDENTIFIER_PREFIX}.${BUNDLE_IDENTIFIER}`,
        paths: ['/launch/*'],
      },
    ],
  },
};

fs.writeFileSync(path.join(PUBLIC_PATH, 'assetlinks.json'), JSON.stringify(assetLinksJson, null, 2));
fs.writeFileSync(
  path.join(PUBLIC_PATH, 'apple-app-site-association'),
  JSON.stringify(appleAppSiteAssociation, null, 2)
);
