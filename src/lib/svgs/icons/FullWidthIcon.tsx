import { SVGProps } from "@/lib/types/prop";

const FullWidthIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M10 12H3l3-3m0 6l-3-3m11 0h7l-3-3m0 6l3-3M3 6V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1M3 18v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" /></svg>
  );
};

export default FullWidthIcon;
