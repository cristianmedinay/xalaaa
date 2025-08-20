/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface ApiErrors {
  [field: string]: string[];
}

export declare type FormFieldValue = any;

export interface IFormValues {
  [name: string]: FormFieldValue;
}
