import { SVGProps } from "@/lib/types/prop.types";

const TextAlignCenterIcon = (props: SVGProps) => {
    return (
        // <svg
        //     width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        //     stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        //     {...props}
        // >
        //     <path d="M3 4.5H21" />
        //     <path d="M7.26001 9.5H16.74" />
        //     <path d="M3 14.5H21" />
        //     <path d="M7.26001 19.5H16.74" />
        // </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 5H3" /><path d="M17 12H7" /><path d="M19 19H5" /></svg>
    );
};

export default TextAlignCenterIcon;
