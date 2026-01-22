import { SVGProps } from "@/lib/types/prop.types";

const ArrowLeftIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M5 12h14m-7-7l-7 7l7 7" /></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m5 12l6-6m-6 6l6 6m-6-6h14" /></svg>
  );
};

export default ArrowLeftIcon;
