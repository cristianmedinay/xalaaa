/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { SourceType } from "../../enums";

export interface ISourceData {
  SourceType: SourceType;

  CacheDataValidTo?: string;
}
