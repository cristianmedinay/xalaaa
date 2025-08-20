/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaCategoryModel } from "./IMediaCategoryModel";

export type IMediaSearchCategories = Pick<
  IMediaCategoryModel,
  "CategoryName" | "CategoryCode" | "CategoryId"
>;
