/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import queryString, { ParseOptions, StringifyOptions } from "query-string";

const urlRegex =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export interface IQueryParams {
  [key: string]: any;
}

type Query = string | IQueryParams;

export class UrlHelper {
  static stringify = (
    queryParams: IQueryParams,
    options?: StringifyOptions
  ) => {
    return queryString.stringify(queryParams, options);
  };

  static parse = (
    query: string,
    _options?: StringifyOptions
  ): { [key: string]: any } => {
    return queryString.parse(query);
  };

  static parseUrl = (query: string, options?: ParseOptions) => {
    return queryString.parseUrl(query, options);
  };

  static parametrize = (
    url: string,
    queryParams?: IQueryParams,
    options?: StringifyOptions
  ) => {
    if (!queryParams) {
      return url;
    }

    return `${url}?${UrlHelper.stringify(queryParams, options)}`;
  };

  /**
   * Converts query strings and query params into a single query string.
   *
   * @returns {string} Returns the joined query string.
   * @example
   *
   * joinQueries('?a=foo&b=bar', ?c=foo);
   * // => '?a=foo&b=bar&c=foo'
   * joinQueries('?a=foo&b=bar', { c: foo });
   * // => '?a=foo&b=bar&c=foo'
   */
  static joinQueries = (...queries: Query[]): string => {
    const query = queries.map((q: Query) => {
      if (typeof q === "string") {
        return UrlHelper.parse(q);
      }
      return q;
    });
    // get rid of duplicated keys
    const queryParams = Object.assign({}, ...query);

    return UrlHelper.parametrize("", queryParams);
  };

  static isUrl = (path: string): boolean => urlRegex.test(path);

  static getValidHttpUrl = (url = "") => {
    let newUrl = window.decodeURIComponent(url);
    newUrl = newUrl.trim().replace(/\s/g, "");

    if (/^(:\/\/)/.test(newUrl)) {
      return `http${newUrl}`;
    }
    if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
      return `http://${newUrl}`;
    }

    return newUrl;
  };
}
