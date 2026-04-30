import { SVGProps } from "@/lib/types/prop";

const FullHeightIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M12 10V3l3 3M9 6l3-3m0 11v7l3-3m-6 0l3 3m6-18h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-1M6 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h1" /></svg>
  );
};

export default FullHeightIcon;
