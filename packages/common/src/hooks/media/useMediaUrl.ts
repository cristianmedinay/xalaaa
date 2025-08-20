/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useEffect } from "react";

import { IMediaPlayInfoModel } from "models";

export const useMediaUrl = (config: IMediaPlayInfoModel | undefined) => {
  const cookies = config?.Cookies ?? [];

  useEffect(() => {
    for (const cookie of cookies) {
      document.cookie = `${cookie.Name}=${cookie.Value};Path=${cookie.Path};Domain=${cookie.Domain}`;
    }
  }, [config?.ContentUrl]);

  const searchParams = new URLSearchParams();

  for (const cookie of cookies) {
    if (!cookie?.Value) return;

    searchParams.append(
      cookie.Name.replace("CloudFront-", ""),
      encodeURIComponent(cookie.Value)
    );
  }

  const url = config?.ContentUrl;
  const params = searchParams.toString();

  if (!url) {
    return undefined;
  }

  return params ? `${url}?${params}` : url;
};
