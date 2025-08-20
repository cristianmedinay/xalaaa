/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { OperationResultType } from "../../enums";
import { GuidHelper } from "../../helpers";
import {
  OperationResult,
  StorageOptions,
  StorageUploadFileInfo,
} from "../../models";

import { IStorageProvider } from "./IStorageProvider";

export class AWSStorageProvider implements IStorageProvider {
  _options: StorageOptions;

  _s3: any; // AWS.S3

  constructor(options: StorageOptions) {
    this._options = options;

    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = options.Region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: options.Token,
    });
    // AWS SDK was loaded after bluebird, set promise dependency
    AWS.config.setPromisesDependency(Promise);

    this._s3 = new AWS.S3({
      apiVersion: "2006-03-01", // latest
      params: { Bucket: options.Container },
    });
  }

  uploadFile(
    path: string,
    file: File,
    fileKey?: string
  ): Promise<OperationResult<StorageUploadFileInfo>> {
    return new Promise((resolve, reject) => {
      let _path = path.trim();

      if (!_path) {
        reject({
          ResultType: OperationResultType.Error,
          Message: "Path names must contain at least one non-space character.",
        });
      }

      if (!path.endsWith("/")) {
        _path += "/";
      }

      if (!file) {
        reject({
          ResultType: OperationResultType.Error,
          Message: "Please choose a file to upload first.",
        });
      }

      const fileExtension = file.name.split(".").pop();
      let fileUrl = `${path}/${GuidHelper.newGuid()}`;

      if (fileExtension) {
        fileUrl += `.${fileExtension}`;
      }

      this._checkPath(_path)
        .then(() => {
          // Use S3 ManagedUpload class as it supports multipart uploads
          const s3ManagedUpload = new AWS.S3.ManagedUpload({
            params: {
              Bucket: this._options.Container,
              Key: fileUrl,
              Body: file,
              ACL: "public-read",
            },
          });

          s3ManagedUpload
            .promise()
            .then((data: any) => {
              const result: StorageUploadFileInfo = {
                FileKey: fileKey,
                Path: data.Key,
                Url: data.Location,
              };

              if (this._options && this._options.CdnEndpoint) {
                result.Url = `${this._options.CdnEndpoint}/${result.Path}`;
              }

              resolve({
                ResultType: OperationResultType.Ok,
                Message: "Successfully uploaded file.",
                Result: result,
              });
            })
            .catch((err: any) => {
              reject({
                ResultType: OperationResultType.Error,
                Message:
                  "There was an error uploading your file: " + err.message,
              });
            });
        })
        .catch((error: OperationResult<boolean>) => {
          reject(error);
        });
    });
  }

  deleteFile(
    filePath: string,
    fileKey?: string
  ): Promise<OperationResult<StorageUploadFileInfo>> {
    return new Promise((resolve, reject) => {
      const _filePath = filePath.trim();

      if (!_filePath) {
        reject({
          ResultType: OperationResultType.Error,
          Message:
            "File path name must contain at least one non-space character.",
        });
      }

      this._s3.deleteObject({ Key: filePath }, (err: any, _data: any) => {
        if (err) {
          reject({
            ResultType: OperationResultType.Error,
            Message: "There was an error deleteing file: " + err.message,
            Result: false,
          });
        }

        const result: StorageUploadFileInfo = {
          FileKey: fileKey,
          Path: filePath,
        };

        resolve({
          ResultType: OperationResultType.Ok,
          Result: result,
        });
      });
    });
  }

  _checkPath = (path: string): Promise<OperationResult<boolean>> => {
    return new Promise((resolve, reject) => {
      this._s3.headObject({ Key: path }, (err: any, _data: any) => {
        // Path not exists
        if (err && err.code === "NotFound") {
          // Create path
          this._s3.putObject({ Key: path }, (err: any, _data: any) => {
            if (err) {
              reject({
                ResultType: OperationResultType.Error,
                Message: "There was an error creating path: " + err.message,
                Result: false,
              });
            }

            resolve({
              ResultType: OperationResultType.Ok,
              Result: true,
            });
          });
        } else {
          resolve({
            ResultType: OperationResultType.Ok,
            Result: true,
          });
        }
      });
    });
  };
}
