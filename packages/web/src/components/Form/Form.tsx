/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import RcForm from "rc-field-form";
import { FormInstance, Meta } from "rc-field-form/es/interface";

export interface ChildProps {
  [name: string]: any;
}

export interface FieldChildrenProps {
  control: ChildProps;
  meta: Meta;
  form: FormInstance;
}

export const Form = RcForm;
