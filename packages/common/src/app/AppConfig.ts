/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { StringHelper } from "../helpers/stringHelper";

class AppConfig {
  static get ApiUrl(): string {
    return StringHelper.toString(process.env.REACT_APP_API_URL);
  }

  static get KonodracUrl(): string {
    return StringHelper.toString(process.env.REACT_APP_KONODRAC_ANALYTICS_URL);
  }

  static get AnalyticsDomain(): string {
    return `${process.env.REACT_APP_ANALYTICS_DOMAIN}`;
  }

  static get DataProvider(): string {
    return StringHelper.toString(process.env.REACT_APP_DATA_PROVIDER);
  }

  static get PaymentProvider(): string {
    return StringHelper.toString(process.env.REACT_APP_PAYMENT_PROVIDER);
  }

  static get AppName(): string {
    return StringHelper.toString(process.env.REACT_APP_NAME);
  }

  static get AppUrl(): string {
    return StringHelper.toString(process.env.REACT_APP_APP_URL);
  }

  static get DeviceOrientation(): string {
    return StringHelper.toString(process.env.REACT_APP_FORCE_ORIENTATION);
  }

  static get Environment(): string {
    return StringHelper.toString(process.env.REACT_APP_ENV);
  }

  static get PlatformCode(): string {
    return StringHelper.toString(process.env.REACT_APP_PLATFORM_CODE);
  }

  static get PlayerType(): string {
    return StringHelper.toString(process.env.REACT_APP_PLAYER_TYPE);
  }

  static get PlatformVersion(): string {
    return `${process.env.REACT_APP_VERSION}`;
  }

  static get TenantOrigin(): string {
    return StringHelper.toString(process.env.REACT_APP_TENANT_ORIGIN_URL);
  }

  static get AppEnvName(): string {
    return StringHelper.toString(process.env.REACT_APP_ENV_NAME);
  }

  static get FirebaseToken(): string {
    return StringHelper.toString(process.env.REACT_APP_FIREBASE_TOKEN);
  }
}

export { AppConfig };
