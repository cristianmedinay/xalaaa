/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IComponentModel, IScreenModel } from "@xala/common";

export declare type BaseScreenRenderProp = (props: {
  renderScreen: BaseScreenRenderer;
}) => React.ReactNode;

export declare type BaseScreenComponentRenderer = (
  component: IComponentModel,
  screenComponents?: IComponentModel[]
) => React.ReactElement | null;

export declare type BaseScreenCustomComponentRenderer = (
  component: IComponentModel,
  components: IComponentModel[],
  originalRenderer: BaseScreenComponentRenderer
) => React.ReactElement | null;

export declare type BaseScreenRenderer = (
  screen?: IScreenModel
) => React.ReactElement | null;
