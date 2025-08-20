/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";

import { HTTP_METHOD } from "../../constants";
import {
  IListModelBase,
  IModelBase,
  ISearchFilterModelBase,
} from "../../models";

import { AxiosSubscriber } from "./AxiosSubscriber";
import { PromisifiableBase } from "./PromisifiableBase";

export abstract class SimpleServiceBase<
  TEntity extends IModelBase,
  TListEntity extends IListModelBase<TEntity, TSearchFilter>,
  TKey,
  TSearchFilter extends ISearchFilterModelBase
> extends PromisifiableBase {
  abstract get url(): string;

  public get = (id: TKey): Observable<TEntity> =>
    new Observable(
      (observer: Observer<TEntity>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {
              id,
            },
          },
          method: HTTP_METHOD.GET,
          url: `${this.url}/Get`,
        })
    );

  public delete = (data: TEntity): Observable<void> =>
    new Observable(
      (observer: Observer<void>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/Delete`,
        })
    );

  public insert = (data: TEntity): Observable<TEntity> =>
    new Observable(
      (observer: Observer<TEntity>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/Insert`,
        })
    );

  public update = (data: TEntity): Observable<TEntity> =>
    new Observable(
      (observer: Observer<TEntity>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.PUT,
          url: `${this.url}/Update`,
        })
    );

  public search = (
    filter: TSearchFilter = {
      IncludeCount: true,
      PageNumber: 1,
      PageSize: 10,
    } as TSearchFilter,
    params = {}
  ): Observable<TListEntity> =>
    new Observable(
      (observer: Observer<TListEntity>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params,
          },
          data: filter,
          method: HTTP_METHOD.POST,
          url: `${this.url}/Search`,
        })
    );

  public select = (
    filter: TSearchFilter = {} as TSearchFilter,
    params = {}
  ): Observable<TListEntity> =>
    new Observable(
      (observer: Observer<TEntity[]>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params,
          },
          data: filter,
          method: HTTP_METHOD.POST,
          url: `${this.url}/Select`,
        })
    ).pipe(
      map((data: TEntity[]) => {
        const entities = data || [];

        const result: TListEntity = {
          Entities: entities,
          TotalCount: entities.length,
          Filter: {
            PageSize: entities.length,
            PageNumber: 1,
            IncludeCount: true,
          },
        } as TListEntity;

        return result;
      })
    );
}
