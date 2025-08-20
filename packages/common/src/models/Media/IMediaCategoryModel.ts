/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaCategoryType } from "../../enums";

export interface IMediaCategoryModel {
  CategoryId: number;

  CategoryCode: string;

  CategoryName: string;

  CategoryTypeCode?: MediaCategoryType;

  CategoryColor?: string;
}
