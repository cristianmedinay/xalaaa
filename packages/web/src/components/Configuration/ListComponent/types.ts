/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IListComponentModel } from "@xala/common";

interface IListComponentModelWeb extends IListComponentModel {
  ShowTimeLeft?: boolean;
}
export interface IListComponentProps {
  component: IListComponentModelWeb;
  loading?: boolean;
  readOnly?: boolean;
  ready?: boolean;
  className?: string;
  gridColumns?: number;
  gridRows?: number;
}
