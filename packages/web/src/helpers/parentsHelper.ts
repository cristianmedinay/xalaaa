/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaModel } from "@xala/common";

/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export default function getAbsoluteParent(media: IMediaModel): string {
  if (media.ParentMedia) {
    return getAbsoluteParent(media.ParentMedia);
  }

  return media.Title || "";
}
