/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { OperationResult, StorageUploadFileInfo } from "../../models";

export interface IStorageProvider {
  uploadFile(
    path: string,
    file: File,
    fileKey?: string
  ): Promise<OperationResult<StorageUploadFileInfo>>;

  deleteFile(
    filePath: string,
    fileKey?: string
  ): Promise<OperationResult<StorageUploadFileInfo>>;
}
