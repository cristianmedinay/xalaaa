/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface IMediaTimestampModel {
  Hour: number;

  Minute: number;

  Second: number;

  ClientTimestamp?: string;

  ApiTimestamp?: string;
}
