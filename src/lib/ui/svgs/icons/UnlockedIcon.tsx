import { SVGProps } from "@/lib/types/prop.types";

const UnlockedIcon = (props: SVGProps) => {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" {...props}><path d="m5 15c0-3.866 3.13401-7 7-7 3.866 0 7 3.134 7 7s-3.134 7-7 7c-3.86599 0-7-3.134-7-7z" strokeWidth="1.5" /><g strokeLinecap="round"><path d="m7.5 9.5v-3c0-2.48528 2.01472-4.5 4.5-4.5 1.5602 0 2.935.79401 3.7422 2" strokeWidth="1.5" /><path d="m12 15h.009" strokeLinejoin="round" strokeWidth="2" /></g></svg>
  );
};

export default UnlockedIcon;
