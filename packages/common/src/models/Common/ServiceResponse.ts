/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export type ServiceResponse<T, E> =
  | { ok: true; data: T }
  | { ok: false; error: E };
