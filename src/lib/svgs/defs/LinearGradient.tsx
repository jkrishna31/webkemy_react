import { ComponentProps } from "react";

export interface LinearGradientProps {
  stops?: ComponentProps<"stop">[];
}

const LinearGradient = ({
  stops,
}: LinearGradientProps) => {
  return (
    <defs>
      <linearGradient x1={0} y1={0} x2={100} y2={100}>
        {
          stops?.map((stopProps, idx) => (
            <stop key={idx} {...stopProps} />
          ))
        }
      </linearGradient>
    </defs>
  );
};

export default LinearGradient;
