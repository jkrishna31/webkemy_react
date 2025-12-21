import { SVGProps } from "@/lib/types/prop.types";

const CenterIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 16v5" /><path d="M12 3v5" /><path d="M16 12h5" /><path d="M3 12h5" /><path d="M12 12h.01" /></svg>
  );
};

export default CenterIcon;
