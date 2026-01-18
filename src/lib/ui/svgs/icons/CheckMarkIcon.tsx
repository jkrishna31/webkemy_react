import { SVGProps } from "@/lib/types/prop.types";

const CheckMarkIcon = (props: SVGProps) => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M3 9l3 3 7-7" /></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m6.5 17l6 6l13-13" /></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m5 13l4 4L19 7" /></svg>
  );
};

export default CheckMarkIcon;
