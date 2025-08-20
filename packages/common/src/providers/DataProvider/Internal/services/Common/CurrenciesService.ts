/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { HTTP_METHOD } from "../../../../../constants";
import { ICurrencyModel } from "../../../../../models";
import { AxiosSubscriber, PromisifiableBase } from "../../../../../services";

export class CurrenciesService extends PromisifiableBase {
  public select = (): Observable<ICurrencyModel[]> =>
    new Observable(
      (observer: Observer<ICurrencyModel[]>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `/Currencies/Select`,
        })
    );
}
