/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IApplicationFooterItemComponentModel } from "./IApplicationFooterItemComponentModel";
import { IApplicationHeaderItemComponentModel } from "./IApplicationHeaderItemComponentModel";
import { IApplicationMenuItemComponentModel } from "./IApplicationMenuItemComponentModel";
import { IBannerComponentModel } from "./IBannerComponentModel";
import { IEpgComponentModel } from "./IEpgComponentModel";
import { IImageComponentModel } from "./IImageComponentModel";
import { IListComponentModel } from "./IListComponentModel";
import { ISectionMenuComponentModel } from "./ISectionMenuComponentModel";
import { ITextWidgetComponentModel } from "./ITextWidgetComponentModel";
import { IWebViewComponentModel } from "./IWebViewComponentModel";

export type IComponentModel =
  | IApplicationHeaderItemComponentModel
  | IApplicationMenuItemComponentModel
  | IApplicationFooterItemComponentModel
  | IEpgComponentModel
  | IImageComponentModel
  | IListComponentModel
  | IWebViewComponentModel
  | ISectionMenuComponentModel
  | IBannerComponentModel
  | ITextWidgetComponentModel;
