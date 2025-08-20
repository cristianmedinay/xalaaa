/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IGetEnvVariables } from "./konodrac.types";

export const getEnvVariables = (): IGetEnvVariables => {
  const DEFAULT_DATASET_ID = process.env
    .REACT_APP_KONODRAC_ANALYTICS_DATASETID as string;
  const DEFAULT_CHANNEL_NAME = process.env
    .REACT_APP_KONODRAC_DEFAULT_CHANNEL_NAME as string;
  const DEFAULT_CHANNEL_ID = process.env
    .REACT_APP_KONODRAC_DEFAULT_CHANNELID as string;
  const isEnabled = Boolean(DEFAULT_DATASET_ID);

  return {
    DEFAULT_DATASET_ID,
    DEFAULT_CHANNEL_NAME,
    DEFAULT_CHANNEL_ID,
    isEnabled,
  };
};
