/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { OperationResultType } from "../../enums";
import { OperationResult, StorageUploadFileInfo } from "../../models";

import { IStorageProvider } from "./IStorageProvider";

export class InternalStorageProvider implements IStorageProvider {
  deleteFile(
    _filePath: string,
    _fileKey?: string | undefined
  ): Promise<OperationResult<StorageUploadFileInfo>> {
    throw new Error("Method not implemented.");
  }

  uploadFile(
    path: string,
    file: File,
    fileKey?: string
  ): Promise<OperationResult<StorageUploadFileInfo>> {
    return new Promise((resolve) => {
      resolve({
        ResultType: OperationResultType.Ok,
        Result: {
          FileKey: fileKey,
          Path: `${path}/${file.name}`,
        },
      });
    });
  }
}
