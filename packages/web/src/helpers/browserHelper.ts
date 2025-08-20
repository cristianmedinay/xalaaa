/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export class BrowserHelper {
  static isIEBrowser = () => {
    const ua = window.navigator.userAgent;
    // IE 10 and older versions
    const msie = ua.indexOf("MSIE ");
    if (msie > 0) {
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }

    //IE 11
    const trident = ua.indexOf("Trident/");
    if (trident > 0) {
      const rv = ua.indexOf("rv:");
      return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    }

    //Edge
    const edge = ua.indexOf("Edge/");
    if (edge > 0) {
      return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
    }

    // other browser
    return false;
  };
}
