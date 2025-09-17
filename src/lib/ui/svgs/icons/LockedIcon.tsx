import { SVGProps } from "@/types/prop.types";

const LockedIcon = (props: SVGProps) => {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" {...props}><path d="m5 15c0-3.866 3.13401-7 7-7 3.866 0 7 3.134 7 7s-3.134 7-7 7c-3.86599 0-7-3.134-7-7z" strokeWidth="1.5" /><g strokeLinecap="round"><path d="m16.5 9.5v-3c0-2.48528-2.0147-4.5-4.5-4.5-2.48528 0-4.5 2.01472-4.5 4.5v3" strokeWidth="1.5" /><path d="m12 15h.009" strokeLinejoin="round" strokeWidth="2" /></g></svg>
  );
};

export default LockedIcon;
