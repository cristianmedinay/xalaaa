/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export const getMinutesWidth = (minutes: number, hourWidth: number): number =>
  (minutes * hourWidth) / 60;
