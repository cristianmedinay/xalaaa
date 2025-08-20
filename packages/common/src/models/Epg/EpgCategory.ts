/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export class EpgCategory {
  readonly id: number;
  readonly title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}
