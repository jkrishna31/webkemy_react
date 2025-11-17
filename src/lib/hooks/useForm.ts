"use client";

import { useEffect, useState } from "react";

import { isNumber } from "@/lib/utils/general.utils";

export interface IValidation {
  key: string | number
  message?: string
  pattern?: RegExp
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
}

export interface IOption {
  key: string
  label: string
  value: string
}

export interface IFormField {
  key: string;
  label?: string;
  required?: boolean;
  type?: "text" | "number" | "date" | "email" | "select" | "checkbox" | "radio" | "file";
  validations?: number[];
  multiple?: boolean;
  value: string;
  errors?: any[];
  dependee?: any[]; // fields on which this field depends on
  dependent?: any[]; // fields depending on this field
}

export interface IForm {
  [key: string]: IFormField
}

// how to handle array of values
// change validation (min/max) based on the value of other field value (ex: from to date range)

// approach
// divide in two parts - ui and data
// ui parts - order of fields, layout, min/max/minLenght/maxLength (based on validation and depending field value)

const useForm = (initial: IForm) => {
  const [form, setForm] = useState<IForm>(initial);

  const validateField = (fieldKey: string, validations: IValidation[], value?: string) => {
    const validationsToSatisty = form[fieldKey].validations;
    const errors: number[] = [];
    const valueToValidate = value || form[fieldKey].value;
    if (validationsToSatisty && validationsToSatisty.length) {
      validationsToSatisty.forEach((validationId: number) => {
        const validation = validations[validationId];
        if (validation.max != null && isNumber(validation.max) && Number(valueToValidate) > validation.max) {
          errors.push(validationId);
        }
        if (validation.min != null && isNumber(validation.max) && Number(valueToValidate) < validation.min) {
          errors.push(validationId);
        }
        if (validation.maxLength && valueToValidate.length > validation.maxLength) {
          errors.push(validationId);
        }
        if (validation.minLength && valueToValidate.length < validation.minLength) {
          errors.push(validationId);
        }
        if (validation.pattern && !validation.pattern.test(valueToValidate) && !valueToValidate.match(validation.pattern)) {
          errors.push(validationId);
        }
      });
    }
    setFieldProp(fieldKey, "errors", errors);
    return errors;
  };

  const validateForm = (validations: IValidation[]) => {
    let isValid = true;
    Object.keys(form).forEach((key: string) => {
      const errors = validateField(key, validations);
      if (errors.length && isValid) {
        isValid = false;
      }
    });
    return isValid;
  };

  const setFieldProp = (fieldKey: string, fieldProp: string, value: any[]) => {
    setForm(currForm => ({ ...currForm, [fieldKey]: { ...currForm[fieldKey], [fieldProp]: value } }));
  };

  const setFieldValue = (fieldKey: string, value: string) => {
    setForm(currForm => ({ ...currForm, [fieldKey]: { ...currForm[fieldKey], value } }));
  };

  const resetFieldValue = (fieldKey: string) => {
    setForm(currForm => ({ ...currForm, [fieldKey]: { ...currForm[fieldKey], value: "" } }));
  };

  const resetForm = () => {
    setForm(initial);
  };

  const clearForm = () => {

  };

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  return {
    form, setFieldValue,
    resetFieldValue, resetForm, clearForm,
    validateField, validateForm,
  };
};

export default useForm;
