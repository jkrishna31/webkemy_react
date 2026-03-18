"use client";

import { useCallback, useEffect, useEffectEvent, useState } from "react";

import { deepClone } from "@/lib/utils/object.utils";

export interface IValidation {
  key: string | number
  message?: string
  pattern?: RegExp
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  required?: boolean
}

type Key = string | number | symbol;

export type ObjPath<T> = T extends object
  ? {
    [K in keyof T]: [K] | [K, ...ObjPath<T[K]>]
  }[keyof T]
  : [];

type IsPlainObject<T> =
  T extends Function ? false :
  T extends Array<any> ? true :
  T extends object ? true :
  false;

type LeafValues<T> =
  IsPlainObject<T> extends true
  ? T[keyof T] extends infer V
  ? LeafValues<V>
  : never
  : T;

type FromValue = string | number | boolean | Date | FileList;
type Validation = {
  id: string;
  required?: boolean;
  min?: number;
  max?: number;
  minLength: number;
  maxLength: number;
  pattern?: RegExp;
  accept: RegExp;
};

type ValidationSchema<T> =
  T extends FromValue
  ? Validation[]
  : T extends Array<infer U>
  ? ValidationSchema<U>[]
  : T extends object
  ? { [K in keyof T]?: ValidationSchema<T[K]> }
  : never;

export const useForm = <T extends { [key: string]: any }>(
  initialValues?: T,
  validations?: ValidationSchema<T>,
  config?: {
    validateOn: "change" | "focusOut" | "all";
    // if has dependent field, then also validate them on change [or handle this explicitly since it's rare]
  },
) => {
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState(); // todo: follow the same structure
  const [values, setValues] = useState<T>(initialValues ?? {} as T);

  const _get = (path: ObjPath<T>) => {
    let _value = values;

    if (typeof path !== "object") return _value?.[path];

    for (let i = 0; i < path.length; i++) {
      if (_value == undefined) return undefined;
      _value = _value[path[i]];
    }

    return _value;
  };

  const _set = useCallback((obj: T, path: ObjPath<T>, value: LeafValues<T>) => {
    let _obj = obj;
    // todo: keep og values
    if (typeof path !== "object") {

    } else {
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (_obj[key] == undefined) (_obj as any)[key] = {};
        _obj = _obj[key];
      }

      (_obj as any)[path[path.length - 1]] = value;
    }
    return obj;
  }, []);

  const setFieldValue = useCallback((path: ObjPath<T>, value: LeafValues<T>) => {
    const newValues = deepClone(values);
    _set(newValues, path, value);
    setValues(newValues);
  }, [_set, values]);

  const resetFieldValue = useCallback(() => {
    // todo: set field value to initialValue
  }, []);

  const isDirty = () => {
    // todo: set dirty with dirty fields path
    // todo: be called on change of field
  };

  function coreValidation(path: ObjPath<T>,) {
    // todo: required, min, max, minLength, maxLength, mask, pattern
  }

  const validateField = (path: ObjPath<T>) => {
    // todo: set errors
  };

  const resetForm = useCallback(() => {
    // todo: reset to initial values
  }, []);

  const clearForm = useCallback(() => {
    // todo: clear values
  }, []);

  const _setValues = useEffectEvent((values?: T) => {
    setValues(values ?? {} as T);
  });

  useEffect(() => {
    _setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    setFieldValue, resetFieldValue,
    resetForm, clearForm,
    validateField,
  };
};
