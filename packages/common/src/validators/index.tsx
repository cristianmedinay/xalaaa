/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  FormInstance,
  Rule,
  RuleObject,
  RuleType,
  StoreValue,
} from "rc-field-form/es/interface";
import React from "react";
import { Trans } from "react-i18next";

import { ApiErrors, IFormValues } from "./types";

const REGEX = {
  PASSWORD:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*['",.#€?()×÷=/_<>\\\[\]'":;{}|~£¥•+!@$%^&*-]).{8,}$/,
  PHONE: /^\+(?:[0-9] ?){1,}[0-9]$/,
  COUNTRYCODE: /^\+/,
};

interface IValidatorAssetValue {
  uid: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export function updateApiErrors(
  apiErrors: ApiErrors,
  changedValues: IFormValues
): [boolean, ApiErrors] {
  const newApiErrors = { ...apiErrors };
  let isUpdated = false;

  for (const field in changedValues) {
    if (field in apiErrors) {
      delete newApiErrors[field];
      isUpdated = true;
    }
  }

  return [isUpdated, newApiErrors];
}

export function combineApiErrors(apiErrors: Record<string, any>) {
  const combinedErrors: string[] = [];
  for (const [_, errors] of Object.entries(apiErrors)) {
    combinedErrors.push(...errors);
  }
  return combinedErrors;
}

export function compareValues(
  value: StoreValue,
  otherValue: StoreValue,
  message?: string
) {
  const errorMessage = message || "Provided values do not match.";

  if (otherValue !== value) {
    return Promise.reject(errorMessage);
  }

  return Promise.resolve();
}

export function buildPasswordPatternRule() {
  return {
    pattern: REGEX.PASSWORD,
    message: <Trans i18nKey="PASSWORD_PATTERN_VALIDATION_MESSAGE" />,
  };
}

export function buildPasswordMatchRule(
  context: FormInstance,
  fieldName: string
) {
  return {
    validator(rule: RuleObject, value: StoreValue) {
      const valueToCompare = context.getFieldValue(fieldName);
      return compareValues(value, valueToCompare);
    },
    message: <Trans i18nKey="PASSWORD_MATCH_VALIDATION_MESSAGE" />,
  };
}

export function buildPasswordEmailMatchRule(
  context: FormInstance,
  fieldName: string
) {
  return {
    validator(rule: RuleObject, value: StoreValue) {
      const valueToCompare: string = context.getFieldValue(fieldName);

      if (value.indexOf(valueToCompare) >= 0) {
        return Promise.reject();
      }

      return Promise.resolve();
    },
    message: <Trans i18nKey="PASSWORD_MATCH_EMAIL_VALIDATION_MESSAGE" />,
  };
}

export function buildPhonePatternRule() {
  return {
    pattern: REGEX.PHONE,
    message: <Trans i18nKey="PHONE_PATTERN_VALIDATION_MESSAGE" />,
  };
}

export function buildPhoneCountryCodeRule() {
  return {
    pattern: REGEX.COUNTRYCODE,
    message: <Trans i18nKey="PHONE_COUNTRY_CODE_VALIDATION_MESSAGE" />,
  };
}

export function buildPhoneMaxLengthRule(): Rule {
  return {
    max: 15,
    message: <Trans i18nKey="PHONE_LENGTH_VALIDATION_MESSAGE" />,
  };
}

export function buildPhoneMinLengthRule(): Rule {
  return {
    min: 9,
    message: <Trans i18nKey="PHONE_LENGTH_TOO_SHORT_VALIDATION_MESSAGE" />,
  };
}

export function buildRequiredRule(valueType?: RuleType | "array"): Rule {
  return {
    required: true,
    type: valueType,
    message: <Trans i18nKey="REQUIRED_VALIDATION_MESSAGE" />,
  };
}

export function buildRequiredObjectPropertiedRule(): Rule {
  return {
    required: true,
    type: "object",
    validator: (_, value: any) => {
      if (typeof value === "object") {
        for (const param in value) {
          if (!value[param]) {
            return Promise.reject(
              `${param} field is required in object ${value}`
            );
          }
        }
      }
      return Promise.resolve();
    },
    message: <Trans i18nKey="REQUIRED_VALIDATION_MESSAGE" />,
  };
}

export const buildRequiredObjectSinglePropertyRule = (
  errorParam: string,
  message: string
): Rule => {
  return {
    required: true,
    type: "object",
    validator: (_: Rule, value: any) => {
      if (typeof value === "object") {
        for (const param in value) {
          if (param === errorParam && !value[param]) {
            return Promise.reject(
              `${param} field is required in object ${value}`
            );
          }
        }
      }
      return Promise.resolve();
    },
    message,
  };
};

export function buildEmailRule(): Rule {
  return {
    type: "email",
    message: <Trans i18nKey="EMAIL_VALIDATION_MESSAGE" />,
  };
}

export function buildPasswordMinimumRule(): Rule {
  return {
    min: 8,
    message: <Trans i18nKey="PASSWORD_LENGTH_VALIDATION_MESSAGE" />,
  };
}

export function buildNameMaxLengthRule(): Rule {
  return {
    max: 20,
    message: <Trans i18nKey="NAME_LENGTH_VALIDATION_MESSAGE" />,
  };
}

export const buildAssetUploadRule = (wrongAsset: boolean) => {
  return {
    validator: (_: Rule, value: IValidatorAssetValue) => {
      if (value && wrongAsset) {
        return Promise.reject(`${value.type} is not proper type`);
      }
      return Promise.resolve();
    },
    message: <Trans i18nKey="INCORRECT_FILE_TYPE" />,
  };
};

export * from "./types";
