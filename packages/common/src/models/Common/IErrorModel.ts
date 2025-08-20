/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { HTTP_RESPONSE_TYPE } from "../../constants";

export interface IExceptionModel {
  Title?: string;
  Message?: string;
  MessageKey?: string;
  ResultType?: number;
}

export interface IFieldErrorModel {
  [key: string]: string[];
}

export type IErrorModel = IExceptionModel | IFieldErrorModel;

export const isFieldError = (error?: IErrorModel): error is IFieldErrorModel =>
  error !== undefined &&
  (error as IExceptionModel).Message === undefined &&
  (error as IExceptionModel).ResultType === undefined;

export const stringToErrorModel = (error: string): IErrorModel => {
  const result: IErrorModel = {
    Message: error,
    ResultType: HTTP_RESPONSE_TYPE.ERROR,
  };

  return result;
};

export const toErrorModel = (errorResponse: any): IErrorModel => {
  let result: IErrorModel = {};

  if (HTTP_RESPONSE_TYPE.SUCCESS !== errorResponse.ResultType) {
    result = errorResponse;
  }

  return result;
};
