/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  EpgConfigurationProvider,
  EpgConfigurationProviderProps,
  EpgContentProvider,
  EpgContentProviderProps,
  EpgDayProvider,
  EpgDayProviderProps,
  EpgProps,
} from "@xala/common";
import React from "react";
import { useMediaQuery } from "react-responsive";

import { EpgMobileView } from "components/Epg/mobile";
import { Breakpoints } from "components/Responsive";

import { EpgDesktopView } from "./desktop";

export const Epg = (props: EpgProps) => {
  const { children } = props;

  const configuration = props as Omit<
    EpgConfigurationProviderProps,
    "children"
  >;
  const day = props as Omit<EpgDayProviderProps, "children">;
  const content = props as Omit<EpgContentProviderProps, "children">;

  const useMobileView = useMediaQuery({
    maxWidth: Breakpoints.MD,
  });

  return (
    <EpgConfigurationProvider {...configuration}>
      <EpgDayProvider {...day}>
        <EpgContentProvider {...content}>
          {useMobileView ? (
            <EpgMobileView>{children}</EpgMobileView>
          ) : (
            <EpgDesktopView>{children}</EpgDesktopView>
          )}
        </EpgContentProvider>
      </EpgDayProvider>
    </EpgConfigurationProvider>
  );
};

Epg.whyDidYouRender = true;
