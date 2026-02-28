import { SVGProps } from "@/lib/types/prop.types";

const SearchReplaceIcon = (props: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M17.5 17.5L22 22m-2-11a9 9 0 0 1-17.064 4M2 11a9 9 0 0 1 17.065-4m0 0V2m0 5H14.5M2.936 15v5m0-5H7.5" /></svg>
    // <!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="m21 21l-6-6M3.291 8a7 7 0 0 1 5.077-4.806a7.02 7.02 0 0 1 8.242 4.403" /><path d="M17 4v4h-4m3.705 4a7 7 0 0 1-5.074 4.798a7.02 7.02 0 0 1-8.241-4.403" /><path d="M3 16v-4h4" /></svg>
  );
};

export default SearchReplaceIcon;
