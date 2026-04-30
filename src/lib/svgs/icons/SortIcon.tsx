import { SVGProps } from "@/lib/types/prop";

const SortIcon = (props: SVGProps) => {
    return (
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 16 4 4 4-4" /><path d="M7 20V4" /><path d="m21 8-4-4-4 4" /><path d="M17 4v16" /></svg>
        // <!-- Icon from ProIcons by ProCode - https://github.com/ProCode-Software/proicons/blob/main/LICENSE -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M12 9.867L8.186 6.053a1.5 1.5 0 0 0-1.061-.44M2.25 9.868l3.814-3.814c.293-.293.677-.44 1.061-.44m0 13.395V5.614m9.75-.124v13.394m4.875-4.253l-3.814 3.814c-.293.293-.677.44-1.061.44M12 14.63l3.814 3.814c.293.293.677.44 1.061.44" /></svg>
    );
};

export default SortIcon;
