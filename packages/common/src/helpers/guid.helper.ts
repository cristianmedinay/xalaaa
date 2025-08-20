/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export class GuidHelper {
  static empty = "00000000-0000-0000-0000-000000000000";

  static maxValue = "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF";

  static newGuid() {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);

        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );

    return uuid;
  }
}
