/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import { BehaviorSubject } from "rxjs";

import { IMediaModel } from "../../models";

export const useMediaContext = (media?: IMediaModel) => {
  const subject = React.useRef(
    new BehaviorSubject<IMediaModel | undefined>(media)
  );

  React.useEffect(() => {
    subject.current.next(media);
  }, [media]);

  return React.useMemo(() => subject.current.asObservable(), [subject]);
};
