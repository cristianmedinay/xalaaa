/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import latinize from "latinize";

export class StringHelper {
  /*
   * Function used to generate an uniq random string
   */
  static generateRandomString = () =>
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  static toString(value: any) {
    if (value === null || value === undefined) {
      return "";
    }

    return `${value}`;
  }

  static latinize = (value: string) => latinize(value);

  static stringToSlug(str: string): string {
    str = str.toLowerCase();

    // Reemplaza los caracteres acentuados o especiales
    str = str.normalize("NFD").replace(/[̀-ͯ]/g, "");
    str = str.replace(/ñ/g, "n").replace(/ç/g, "c");

    // Reemplaza apóstrofes por guiones
    str = str.replace(/'/g, "-");

    // Reemplaza cualquier caracter no alfanumérico o espacio por un guion
    str = str.replace(/[^a-z0-9\s-]/g, "");

    // Reemplaza espacios o múltiples guiones consecutivos por un solo guion
    str = str.replace(/\s+/g, "-").replace(/-+/g, "-");

    // Elimina guiones al inicio o final
    str = str.replace(/^-+|-+$/g, "");

    return str;
  }
}
