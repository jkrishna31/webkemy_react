import { SVGProps } from "@/lib/types/prop.types";

const TextAlignRightIcon = (props: SVGProps) => {
    return (
        // <svg
        //     width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        //     stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        //     {...props}
        // >
        //     <path d="M3 4.5H21" />
        //     <path d="M11.53 9.5H21" />
        //     <path d="M3 14.5H21" />
        //     <path d="M11.53 19.5H21" />
        // </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 5H3" /><path d="M21 12H9" /><path d="M21 19H7" /></svg>
    );
};

export default TextAlignRightIcon;
