/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Observable, Observer } from "rxjs";

import { HTTP_METHOD } from "../../../../../constants";
import {
  IAssetAgeRestrictionModel,
  IAssetContentModel,
  IAssetImageModel,
  IAssetListModel,
  IAssetModel,
  IAssetSearchFilterModel,
  IInsertAssetRequestModel,
  IInsertAssetResponseModel,
  IUploadFileInfoHeaderModel,
  UploadFileInfoModel,
} from "../../../../../models";
import { AxiosSubscriber, SimpleServiceBase } from "../../../../../services";
import { UploadType } from "../../enums";
import {
  IAssetCategoriesListModel,
  IAssetCategoriesSearchFilterModel,
  IAssetContentStreamTypeModel,
  IAssetContentTypeModel,
  IAssetCoversModel,
  IAssetImageTypeModel,
  IAssetPeopleListModel,
  IAssetPeopleSearchFilterModel,
  ICatchupInsertModel,
  ICatchupInsertResponseModel,
} from "../../models";

export class AssetService extends SimpleServiceBase<
  IAssetModel,
  IAssetListModel,
  number,
  IAssetSearchFilterModel
> {
  get url(): string {
    return "/Assets";
  }

  public create = (
    data: IInsertAssetRequestModel
  ): Observable<IInsertAssetResponseModel> =>
    new Observable(
      (observer: Observer<IInsertAssetResponseModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `${this.url}/Insert`,
        })
    );

  public getAsset = (id: number): Observable<IAssetModel> =>
    new Observable(
      (observer: Observer<IAssetModel>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: { id },
          },
          method: HTTP_METHOD.GET,
          url: `/Assets/Get`,
        })
    );

  public createAsset = (data: IAssetModel): Observable<IAssetModel> =>
    new Observable(
      (observer: Observer<IAssetModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `/Assets/Insert`,
        })
    );

  public updateAsset = (data: IAssetModel): Observable<IAssetModel> =>
    new Observable(
      (observer: Observer<IAssetModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.PUT,
          url: `/Assets/Update`,
        })
    );

  public deleteAsset = (data: IAssetModel): Observable<IAssetModel> =>
    new Observable(
      (observer: Observer<IAssetModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: `/Assets/Delete`,
        })
    );

  public updateAssetContentUrl = (
    id: number,
    contentUrl: string,
    contentStatusCode = "READY"
  ): Observable<IAssetModel> =>
    new Observable(
      (observer: Observer<IAssetModel>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: { id, contentUrl, contentStatusCode },
          },
          method: HTTP_METHOD.POST,
          url: `/Assets/UpdateContentUrl`,
        })
    );

  public getAssetContentUploadUrl = (
    assetId: number
  ): Observable<UploadFileInfoModel> =>
    new Observable(
      (observer: Observer<UploadFileInfoModel>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `/Assets/GetContentUploadUrl?id=${assetId}`,
        })
    );

  public uploadAssetContentFile = (
    uploadInfo: UploadFileInfoModel,
    file: File,
    onProgress: (e: { percent: number }) => void
  ): Observable<UploadFileInfoModel> =>
    new Observable((observer: Observer<UploadFileInfoModel>) => {
      const _headers =
        uploadInfo.Headers &&
        uploadInfo.Headers.reduce(
          (
            headers: Record<string, string>,
            header: IUploadFileInfoHeaderModel
          ) => {
            headers[header.Key] = header.Value;
            return headers;
          },
          {}
        );

      return new AxiosSubscriber(observer, {
        axiosConfig: {
          headers: {
            ..._headers,
            Authorization: "",
            "Content-Type": file.type,
          },
          onUploadProgress: (e: ProgressEvent) =>
            onProgress({ percent: (e.loaded / e.total) * 100 }),
        },
        data: file,
        method: uploadInfo.Method,
        url: uploadInfo.Url,
      });
    });

  public getUploadFileInfo = (
    assetId: number
  ): Observable<UploadFileInfoModel> =>
    new Observable(
      (observer: Observer<UploadFileInfoModel>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `/AssetImages/GetUploadFileInfo?assetId=${assetId}`,
        })
    );

  public getContentUploadUrl = (
    assetId: number
  ): Observable<UploadFileInfoModel> =>
    new Observable(
      (observer: Observer<UploadFileInfoModel>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: `/Assets/GetContentUploadUrl?id=${assetId}`,
        })
    );

  public updateAssetImage = (data: IAssetImageModel): Observable<IAssetModel> =>
    new Observable(
      (observer: Observer<IAssetModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.PUT,
          url: "/AssetImages/Update",
        })
    );

  public deleteAssetImage = (data: IAssetImageModel): Observable<IAssetModel> =>
    new Observable(
      (observer: Observer<IAssetModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: "/AssetImages/Delete",
        })
    );

  public addAssetImage = (data: IAssetImageModel): Observable<IAssetModel> =>
    new Observable(
      (observer: Observer<IAssetModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: "/AssetImages/Insert",
        })
    );

  public addAssetContent = (
    data: IAssetContentModel
  ): Observable<IAssetContentModel> =>
    new Observable(
      (observer: Observer<IAssetContentModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: "/AssetContents/Insert",
        })
    );

  public updateAssetContent = (
    data: IAssetContentModel
  ): Observable<IAssetContentModel> =>
    new Observable(
      (observer: Observer<IAssetContentModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.PUT,
          url: "/AssetContents/Update",
        })
    );

  public deleteAssetContent = (
    data: IAssetContentModel
  ): Observable<IAssetContentModel> =>
    new Observable(
      (observer: Observer<IAssetContentModel>) =>
        new AxiosSubscriber(observer, {
          data,
          method: HTTP_METHOD.POST,
          url: "/AssetContents/Delete",
        })
    );

  public getAssetContentUploadFileInfo = (
    assetId: number,
    assetContentGuid: string,
    uploadType: UploadType
  ): Observable<UploadFileInfoModel> =>
    new Observable(
      (observer: Observer<UploadFileInfoModel>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {
              assetId,
              assetContentGuid,
              uploadType,
            },
          },
          method: HTTP_METHOD.GET,
          url: "/AssetContents/GetUploadFileInfo",
        })
    );

  public getAssetImageTypes = (): Observable<IAssetImageTypeModel[]> =>
    new Observable(
      (observer: Observer<IAssetImageTypeModel[]>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: "/AssetImageTypes/Select",
        })
    );

  public getAssetContentTypes = (): Observable<IAssetContentTypeModel[]> =>
    new Observable(
      (observer: Observer<IAssetContentTypeModel[]>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: "/AssetContentTypes/Select",
        })
    );

  public getAssetContentStreamTypes = (): Observable<
    IAssetContentStreamTypeModel[]
  > =>
    new Observable(
      (observer: Observer<IAssetContentStreamTypeModel[]>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: "/AssetContentStreamTypes/Select",
        })
    );

  public getAssetAgeRestriction = (): Observable<IAssetAgeRestrictionModel[]> =>
    new Observable(
      (observer: Observer<IAssetAgeRestrictionModel[]>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.GET,
          url: "/AssetAgeRestrictions/Select",
        })
    );

  public selectAssetParent = (id: number): Observable<IAssetModel[]> =>
    new Observable(
      (observer: Observer<IAssetModel[]>) =>
        new AxiosSubscriber(observer, {
          axiosConfig: {
            params: {
              id,
            },
          },
          method: HTTP_METHOD.POST,
          url: "/Assets/SelectParent",
        })
    );

  public searchAssetCategories = (
    filter: IAssetCategoriesSearchFilterModel | undefined
  ): Observable<IAssetCategoriesListModel> =>
    new Observable(
      (observer: Observer<IAssetCategoriesListModel>) =>
        new AxiosSubscriber(observer, {
          data: filter,
          method: HTTP_METHOD.POST,
          url: "/AssetCategories/Search",
        })
    );

  public searchAssetPeople = (
    filter?: IAssetPeopleSearchFilterModel
  ): Observable<IAssetPeopleListModel> =>
    new Observable(
      (observer: Observer<IAssetPeopleListModel>) =>
        new AxiosSubscriber(observer, {
          data: filter,
          method: HTTP_METHOD.POST,
          url: "/AssetPeople/Search",
        })
    );

  public insertCatchup = (
    data?: ICatchupInsertModel
  ): Observable<ICatchupInsertResponseModel> =>
    new Observable(
      (observer: Observer<ICatchupInsertResponseModel>) =>
        new AxiosSubscriber(observer, {
          data: data,
          method: HTTP_METHOD.POST,
          url: "/Catchup/Insert",
        })
    );

  public downloadCoversAndFrames = (): Observable<IAssetCoversModel> =>
    new Observable(
      (observer: Observer<IAssetCoversModel>) =>
        new AxiosSubscriber(observer, {
          method: HTTP_METHOD.POST,
          url: "/Assets/DownloadCoversAndFrames",
        })
    );
}
