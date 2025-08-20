/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { EpgCategory } from "./EpgCategory";

export class EpgDay {
  /**
   * If date is undefined, it means it has categories for all days.
   */
  readonly day?: Date;
  readonly categories: EpgCategory[];

  constructor(day: Date | undefined, categories: EpgCategory[]) {
    this.day = day;
    this.categories = categories;
  }
}
