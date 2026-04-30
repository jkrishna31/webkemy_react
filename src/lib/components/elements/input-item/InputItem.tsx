import { ComponentProps, ElementType } from "react";

import { classes } from "@/lib/utils/style";

import styles from "./InputItem.module.scss";

export type InputItemProps<T extends ElementType> = {
  as?: T
  inline?: boolean
} & ComponentProps<T>;

export const InputItem = <T extends ElementType = "div">({
  as = "div", inline = false,
  children, className,
  ...props
}: InputItemProps<T>) => {
  const Tag = as;

  return (
    <Tag
      className={classes(styles.wrapper, inline && styles.inline, className)}
      aria-disabled={props.disabled}
      {...props}
    >
      {children}
    </Tag>
  );
};


export interface MetaWrapperProps extends ComponentProps<"div"> {

}

const MetaWrapper = ({ children, className, ...restProps }: MetaWrapperProps) => {
  return (
    <div
      className={classes(styles.meta_wrapper, className)}
      {...restProps}
    >
      {children}
    </div>
  );
};


export interface FieldWrapperProps extends ComponentProps<"div"> {
  isInvalid?: boolean;
}

const FieldWrapper = ({ children, className, isInvalid, ...props }: FieldWrapperProps) => {
  return (
    <div
      className={classes(styles.field_wrapper, className)}
      data-invalid={isInvalid}
      {...props}
    >
      {children}
    </div>
  );
};

InputItem.MetaWrapper = MetaWrapper;
InputItem.FieldWrapper = FieldWrapper;
