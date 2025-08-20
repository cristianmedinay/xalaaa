/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ComponentType, IScreenModel } from "@xala/common";

import {
  ImageComponent,
  ListComponentHorizontal,
  WebViewComponent,
} from "../components";

export class ComponentHelper {
  static renderComponents(screen: IScreenModel) {
    if (screen && screen.Components && screen.Components.length > 0) {
      return screen.Components.map((componentDefinition) => {
        if (!componentDefinition.IsVisible) {
          return false;
        }

        switch (componentDefinition.ComponentTypeCode) {
          case ComponentType.List:
            return (
              <ListComponentHorizontal
                key={componentDefinition.Id}
                component={componentDefinition}
              />
            );

          case ComponentType.Image:
            return (
              <ImageComponent
                key={componentDefinition.Id}
                component={componentDefinition}
              />
            );

          case ComponentType.WebView:
            return (
              <WebViewComponent
                key={componentDefinition.Id}
                component={componentDefinition}
              />
            );
        }
      });
    }

    return [];
  }
}
