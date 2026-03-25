import { ComponentPropsWithoutRef } from "react";

export interface SVGProps extends ComponentPropsWithoutRef<"svg"> {
}

export interface IconProps extends SVGProps {
}

export type AsProp<E extends React.ElementType> = {
  as?: E;
};

export type PropsToOmit<E extends React.ElementType, P> = keyof (AsProp<E> & P);

export type PolymorphicComponentProps<
  E extends React.ElementType,
  P
> = P &
  AsProp<E> &
  Omit<React.ComponentProps<E>, PropsToOmit<E, P>>;
