"use client";

import { useCallback, useState } from "react";

import { FileMeta } from "@/lib/components/elements/inputs/FileInput";
import { deepClone } from "@/lib/utils/object";

export type ObjPath<T> = T extends object
  ? {
    [K in keyof T]: [K] | [K, ...ObjPath<T[K]>]
  }[keyof T]
  : [];

type FromValue = string | number | boolean | Date | FileList | FileMeta;

type Validation = {
  id?: string;
  message?: string;
} & Partial<{
  required: boolean;
  min: number;
  max: number;
  minLength: number;
  maxLength: number;
  pattern: RegExp;
  accept: RegExp;
}>;

type ValidationSchema<T> =
  T extends FromValue
  ? (Validation | Validation[])
  : T extends Array<infer U>
  ? ValidationSchema<U>[]
  : T extends object
  ? { [K in keyof T]?: ValidationSchema<T[K]> }
  : never;

export const useForm = <T extends { [key: string]: any }>(
  initialValues?: T,
  validations?: ValidationSchema<T>,
  config?: {
    validateOnChange?: boolean;
    trackModified?: boolean;
  },
) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState();
  const [values, setValues] = useState<T>(initialValues ?? {} as T);

  // ACTIONS:
  // + set a field value
  // + clear a field value
  // + reset a field value to initial value
  // + check if form modified
  // + which fields are modified

  /**
   * TODO:
   *  = og values
   *    + on field value change
   *      > if init value is present [set field's initial value in modified]
   *      > if init value is absent [set the field value in modified to <<NA>>]
   *      > if new value is same as init value [then clear the field from modified]
   *  = isModified [if modified{not null/undefined} is present for at least 1 field]
   *  = errors []
   */

  // internal -----------------------------------------------------------------

  const __get = useCallback((path: ObjPath<T>, from?: any) => {
    let _value = from;

    if (typeof path !== "object") return _value?.[path];

    for (let i = 0; i < path.length; i++) {
      if (_value == undefined) return undefined;
      _value = _value[path[i]];
    }

    return _value;
  }, []);

  const __set = useCallback((path: ObjPath<T>, value: any, to: any) => {
    let _obj = to;
    if (typeof path !== "object") {

    } else {
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (_obj[key] == undefined) (_obj as any)[key] = {};
        _obj = _obj[key];
      }

      (_obj as any)[path[path.length - 1]] = value;
    }
    return to;
  }, []);

  // validate -----------------------------------------------------------------

  const validateField = (path: ObjPath<T>) => {
    const fieldValidations = __get(path, validations);
    if (!fieldValidations) return;
    // todo: using validations and update errors accordingly
    if (Array.isArray(fieldValidations)) {
      // multiple 
    } else {
      // only one item
    }

    // if id/msg is there, then add id/msg & all failed validation item codes [MIN_LENGTH, MAX_LENGTH, MIN, MAX, REQ, ACCEPT, PATTERN]
    // else add individual failed validation codes

    // validations:
    // required - 
    // min - error if on typecast NaN or if less than min
    // max - error if on typecast NaN or if more than max
    // minLength - error if stringified value's length is less than minLength
    // maxLength - error if stringified value's length is more than maxLength
    // pattern = 
    // accept = 

    // value can be {string, boolean, number, array, object}

    // new: how to handle conditional validations like either [len < 3 && req.] or [len >= 3 && len <= 9] or [len > 9 && pattern]
    // can't use individual array item for conditional validation since we need message for 

    // solution:
    // ~ remove the error message part from validation schema & use array of validations as discriminated unions
    // ~ add another property to identify   

    // what about other custom validations:
    // ~ leave it to user, and let me set the fieldError {add field custom to differentiate from internal codes; or may be not needed since internal errors already have code like MIN_LENGTH}
    // ~ or add a validate function in validation item, that will return either true or error code
  };

  const validateForm = () => {
    // todo: check for required, min, max, minLength, maxLength, pattern
  };

  // get ----------------------------------------------------------------------

  const isModified = () => {
    // todo: compare values with initValues 
  };

  // set ----------------------------------------------------------------------

  const setFieldValue = useCallback((path: ObjPath<T>, value: any) => {
    setValues(currValues => {
      const newValues = deepClone(currValues);
      __set(path, value, newValues);
      return newValues;
    });
  }, [__set]);

  const setFieldsValue = useCallback((payload: T) => {
    // todo: set fields value
    setValues(currValues => {
      const newValues = deepClone(currValues);
      // for each values in payload, override in newValues
      return newValues;
    });
  }, []);

  const setFieldErrors = useCallback((path: ObjPath<T>, errors?: Validation["id"][]) => {
    setErrors(currErrors => {
      const newErrors = deepClone(currErrors);
      __set(path, errors, newErrors);
      return newErrors;
    });
  }, [__set]);

  const setFieldsErrors = useCallback((payload: any) => {
    // todo: set fields errors
  }, []);

  // reset --------------------------------------------------------------------

  const resetFieldValue = useCallback((path: ObjPath<T>) => {
    setFieldValue(path, __get(path, initialValues));
  }, [__get, initialValues, setFieldValue]);

  const resetForm = useCallback(() => {
    setValues(initialValues ?? {} as T);
  }, [initialValues]);

  // clear --------------------------------------------------------------------

  const clearFieldError = useCallback((path: ObjPath<T>) => {
    setErrors(currErrors => {
      const newErrors = deepClone(currErrors);
      __set(path, "", newErrors);
      return newErrors;
    });
  }, [__set]);

  const clearErrors = useCallback(() => {
    setErrors(undefined);
  }, []);

  const clearForm = useCallback(() => {
    setValues({} as T);
  }, []);

  // --------------------------------------------------------------------------

  return {
    values, errors, modified,
    isModified,
    setValues, setFieldValue, resetFieldValue, setFieldsValue,
    validateField,
    setFieldErrors, clearFieldError, clearErrors,
    resetForm, clearForm,
    validateForm,
  };
};
