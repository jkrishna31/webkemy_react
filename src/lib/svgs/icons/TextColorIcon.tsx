import { SVGProps } from "@/lib/types/prop";

const TextColorIcon = (props: SVGProps) => {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" {...props}><path d="m3 21h18" /><path d="m19 18-3.3753-8.84153c-1.5673-4.10565-2.351-6.15847-3.6247-6.15847s-2.05739 2.05282-3.62473 6.15847l-3.37527 8.84153" /><path d="m8 11h8" /></svg>
    // <!-- Icon from ProIcons by ProCode - https://github.com/ProCode-Software/proicons/blob/main/LICENSE -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m7.154 13.088l1.73-3.959m0 0h6.231m-6.23 0l2.652-6.065a.5.5 0 0 1 .926 0l2.652 6.065m0 0l1.731 3.96" /><rect width="15.5" height="4.353" x="4.25" y="16.897" rx="1.5" /></svg>
  );
};

export default TextColorIcon;
