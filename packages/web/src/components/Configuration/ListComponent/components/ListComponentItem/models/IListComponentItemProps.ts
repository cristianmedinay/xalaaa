/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { CellType, IMediaModel } from "@xala/common";

export interface IListComponentItemProps {
  cellType?: CellType;
  media?: IMediaModel;
  index?: number;
  isActive?: boolean;
  isSelected?: boolean;
  isRowActive?: boolean;
  style?: React.CSSProperties;
  width?: number;
  isPlaceholder?: boolean;
  readOnly?: boolean;
  withProgress?: boolean; // FIXME temporary for demo only
  isGrid?: boolean;
  hideDate?: boolean;
  showTimeLeft?: boolean;
}
