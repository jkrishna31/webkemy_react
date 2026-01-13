import { SVGProps } from "@/lib/types/prop.types";

const PauseIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5"><rect width="5" height="16.5" x="5" y="3.75" rx="3" /><rect width="5" height="16.5" x="14" y="3.75" rx="3" /></g></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="14" y="3" width="5" height="18" rx="1" /><rect x="5" y="3" width="5" height="18" rx="1" /></svg>
  );
};

export default PauseIcon;
