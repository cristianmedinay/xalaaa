/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { BehaviorSubject, Observable, Observer } from "rxjs";

import { Buffer } from "buffer";

import {
  FileUploadStatus,
  OperationResultType,
  StorageProvider,
} from "../../enums";
import {
  IErrorModel,
  IUploadContentModel,
  IUploadFileInfoHeaderModel,
  OperationResult,
  StorageOptions,
  StorageUploadFileInfo,
  UploadFileInfoModel,
} from "../../models";
import { AxiosSubscriber } from "../Common";

import { AWSStorageProvider } from "./AWSStorageProvider";
import { InternalStorageProvider } from "./InternalStorageProvider";
import { IStorageProvider } from "./IStorageProvider";

export interface IFileStorage {
  [key: string]: {
    file?: File | Blob;
    status?: FileUploadStatus;
    progress?: number;
  };
}

export class StorageService {
  public static instance: StorageService;

  public _provider: IStorageProvider = new InternalStorageProvider();
  private _files = new BehaviorSubject<IFileStorage>({});
  public files$ = this._files;

  public static getInstance() {
    if (StorageService.instance) {
      return StorageService.instance;
    }

    StorageService.instance = new StorageService();

    return StorageService.instance;
  }

  public init = (options: StorageOptions): void => {
    switch (options.Provider) {
      case StorageProvider.AWS:
        this._provider = new AWSStorageProvider(options);
        break;
      case StorageProvider.Azure:
        break;
      default:
        this._provider = new InternalStorageProvider();
        break;
    }
  };

  /**
   *
   * @param {File | Blob | FormData | IUploadContentModel } file
   * @param {UploadFileInfoModel}                           fileUploadInfo
   * @param {string | number}                               fileKey
   * @returns
   */
  public uploadFile = (
    file: File | Blob | FormData | IUploadContentModel,
    fileUploadInfo: UploadFileInfoModel,
    fileKey?: string | number
  ): Promise<OperationResult<UploadFileInfoModel>> => {
    return new Promise((resolve, reject) => {
      const observable = new Observable(
        (observer: Observer<OperationResult<UploadFileInfoModel>>) => {
          const _headers =
            (fileUploadInfo.Headers &&
              fileUploadInfo.Headers.reduce(
                (
                  headers: Record<string, string>,
                  header: IUploadFileInfoHeaderModel
                ) => {
                  headers[header.Key] = header.Value;
                  return headers;
                },
                {}
              )) ||
            {};

          _headers["Content-Type"] = "application/octet-stream";

          let body: File | Blob | FormData | Buffer | undefined;

          if ("Content" in file) {
            if (typeof file.Content === "string") {
              body = Buffer.from(file.Content, "base64");
            } else {
              body = file.Content;
            }

            if (file.ContentType) {
              _headers["Content-Type"] = file.ContentType;
            }

            if (file.ContentEncoding) {
              _headers["Content-Encoding"] = file.ContentEncoding;
            }
          } else {
            body = file;
          }

          return new AxiosSubscriber(observer, {
            axiosConfig: {
              headers: {
                ..._headers,
              },
              transformRequest: (data: any, headers?: any) => {
                delete headers["Authorization"];

                return data;
              },
            },
            data: body,
            method: fileUploadInfo.Method,
            url: fileUploadInfo.Url,
          });
        }
      );
      if (fileKey) {
        const files = this._files.getValue();

        files[fileKey] = {
          status: FileUploadStatus.Uploading,
          progress: 0,
        };
        this._files.next(files);
      }

      return observable
        .toPromise()
        .then(() => {
          if (fileKey) {
            const files = this._files.getValue();
            const fileStatus = files[fileKey] ?? {};
            (fileStatus.status = FileUploadStatus.Completed),
              (fileStatus.progress = 100);
            files[fileKey] = fileStatus;
            this._files.next(files);
          }

          resolve({
            ResultType: OperationResultType.Ok,
            Message: "Successfully uploaded file.",
            Result: fileUploadInfo,
          });
        })

        .catch((error: IErrorModel) => {
          if (fileKey) {
            const files = this._files.getValue();
            const fileStatus = files[fileKey] ?? {};
            (fileStatus.status = FileUploadStatus.Failed),
              (files[fileKey] = fileStatus);
            this._files.next(files);
          }
          reject({
            ResultType: OperationResultType.Error,
            Message: "There was an error uploading your file: " + error.Message,
          });
        });
    });
  };

  public getFile = (
    fileUploadInfo: UploadFileInfoModel
  ): Promise<OperationResult<Blob>> => {
    return new Promise((resolve, reject) => {
      const observable = new Observable((observer: Observer<Blob>) => {
        const _headers =
          fileUploadInfo.Headers &&
          fileUploadInfo.Headers.reduce(
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
            },
            responseType: "blob",
          },
          method: fileUploadInfo.Method,
          url: fileUploadInfo.Url,
        });
      });

      return observable
        .toPromise()
        .then((file) => {
          resolve({
            Message: "Successfully downloaded file.",
            Result: file,
            ResultType: OperationResultType.Ok,
          });
        })
        .catch((error: IErrorModel) => {
          reject({
            Message:
              "There was an error downloading your file: " + error.Message,
            ResultType: OperationResultType.Error,
          });
        });
    });
  };

  public deleteFile(
    filePath: string,
    fileKey?: string
  ): Promise<OperationResult<StorageUploadFileInfo>> {
    return this._provider.deleteFile(filePath, fileKey);
  }
}
