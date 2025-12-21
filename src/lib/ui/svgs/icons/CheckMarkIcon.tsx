import { SVGProps } from "@/lib/types/prop.types";

const CheckMarkIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}>
      <path d="M3 9l3 3 7-7" />
    </svg>
  );
};

export default CheckMarkIcon;
