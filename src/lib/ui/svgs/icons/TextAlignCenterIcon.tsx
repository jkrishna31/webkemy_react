import { SVGProps } from "@/lib/types/prop.types";

const TextAlignCenterIcon = (props: SVGProps) => {
    return (
        <svg
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            {...props}
        >
            <path d="M3 4.5H21" />
            <path d="M7.26001 9.5H16.74" />
            <path d="M3 14.5H21" />
            <path d="M7.26001 19.5H16.74" />
        </svg>
    );
};

export default TextAlignCenterIcon;
