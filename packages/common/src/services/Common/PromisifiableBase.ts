/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable } from "rxjs";

import { IErrorModel, ServiceResponse } from "../../models";

export type PromisifyObservable<C, E> = {
  [P in keyof C]: C[P] extends (...args: any[]) => any
    ? ReturnType<C[P]> extends Observable<infer U>
      ? (...args: Parameters<C[P]>) => Promise<ServiceResponse<U, E>>
      : C[P]
    : C[P];
};

export class PromisifiableBase {
  public promisify = (): PromisifyObservable<this, IErrorModel> => {
    const handler = {
      get(target: any, prop: any) {
        if (typeof target[prop] === "function") {
          return (...args: any[]) => {
            const returnValue = target[prop](...args);
            if (returnValue?.toPromise) {
              return returnValue.toPromise().then(
                (data: any) => ({
                  ok: true,
                  data,
                }),
                (error: any) => ({
                  ok: false,
                  error,
                })
              );
            }
            return returnValue;
          };
        }
        return target[prop];
      },
    };
    return new Proxy<any>(this, handler);
  };
}
