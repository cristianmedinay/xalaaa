/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ComponentType, IComponentModel, IMediaListModel } from "@xala/common";
import React from "react";

import { SectionMenuListComponent } from "components/Configuration/SectionMenuListComponent/SectionMenuListComponent";

import {
  BannerComponent,
  EpgComponent,
  ImageComponent,
  ListComponent,
  TextWidget,
  WebViewComponent,
} from "../../components";

import {
  BaseScreenComponentRenderer,
  BaseScreenCustomComponentRenderer,
  BaseScreenRenderer,
  BaseScreenRenderProp,
} from "./types";

interface IBaseScreenProps {
  children: BaseScreenRenderProp;
  customRender?: (renderer?: BaseScreenRenderer) => React.ReactElement[] | null;
  renderComponent?: BaseScreenCustomComponentRenderer;
  mediaList: { [key: string]: IMediaListModel };
}

export class BaseScreen extends React.PureComponent<IBaseScreenProps> {
  private isComponentLoaded = (component: IComponentModel) => {
    switch (component.ComponentTypeCode) {
      case ComponentType.List: {
        const { mediaList } = this.props;

        if (component?.SourceId) {
          const list = mediaList[component.SourceId];
          return !list?.IsLoading;
        }
      }
      default:
        return true;
    }
  };

  renderComponent: BaseScreenComponentRenderer = (
    component,
    screenComponents
  ) => {
    const index = screenComponents
      ? screenComponents.findIndex(
          (screenComponent) => screenComponent.Id == component.Id
        )
      : -1;
    const previousComponentsLoaded = screenComponents
      ?.slice(0, index)
      ?.map(this.isComponentLoaded);
    const allLoaded = previousComponentsLoaded
      ? previousComponentsLoaded.every((row) => row === true)
      : true;

    switch (component.ComponentTypeCode) {
      case ComponentType.List:
        return (
          <ListComponent
            key={component.Id}
            component={component}
            ready={allLoaded}
          />
        );
      case ComponentType.SectionMenu:
        return (
          <SectionMenuListComponent key={component.Id} component={component} />
        );
      case ComponentType.Image:
        return <ImageComponent key={component.Id} component={component} />;
      case ComponentType.WebView:
        return <WebViewComponent key={component.Id} component={component} />;
      case ComponentType.Epg:
        return <EpgComponent key={component.Id} component={component} />;
      case ComponentType.Banner:
        return <BannerComponent key={component.Id} component={component} />;
      case ComponentType.TextWidget:
        return (
          <TextWidget
            key={component.Id}
            component={component}
            isRenderedFirst={!index}
          />
        );
      default:
        return null;
    }
  };

  renderScreen = (screen: any) => {
    if (screen && screen.Components && screen.Components.length > 0) {
      return screen.Components.map((component: any) => {
        if (!component.IsVisible) {
          return false;
        }

        const componentView = this.props.renderComponent
          ? this.props.renderComponent(
              component,
              screen.Components as any,
              this.renderComponent
            )
          : this.renderComponent(component, screen.Components);

        if (componentView) {
          return componentView;
        }
      });
    }

    return null;
  };

  render() {
    const { children } = this.props;

    return (children as BaseScreenRenderProp)({
      renderScreen: this.renderScreen,
    });
  }
}
