/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface IMediaSuggestionModel {
  Id: number;

  TypeCode: string;

  TypeName?: string;

  Title?: string;

  CategoryId?: number;

  PersonId?: number;

  Value?: string;

  IconResourceKey?: string;
}
