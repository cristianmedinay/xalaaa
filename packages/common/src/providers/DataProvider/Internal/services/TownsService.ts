/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";

import { HTTP_METHOD } from "../../../../constants";
import { ITownsListModel, ITownsModel } from "../../../../models";
import { AxiosSubscriber, PromisifiableBase } from "../../../../services";

export class TownsService extends PromisifiableBase {
  get url(): string {
    return "/Towns";
  }

  public getTowns = (): Observable<ITownsListModel> =>
    new Observable(
      (observer: Observer<ITownsModel[]>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `${this.url}/Select`,
        })
    ).pipe(
      map((data: ITownsModel[]) => {
        const entities = data || [];

        const result: ITownsListModel = {
          Entities: entities,
          TotalCount: entities.length,
        };

        return result;
      })
    );
}
