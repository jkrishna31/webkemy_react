import { SVGProps } from "@/lib/types/prop.types";

const ButtonIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><rect width="18.5" height="11" x="2.75" y="6.5" rx="4" /><path d="M7 12h10" /></svg>
  );
};

export default ButtonIcon;
