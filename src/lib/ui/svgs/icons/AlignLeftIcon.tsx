import { SVGProps } from "@/types/prop.types";

const AlignLeftIcon = (props: SVGProps) => {
    return (
        <svg
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            {...props}
        >
            <path d="M3 4.5H21" />
            <path d="M3 9.5H12.47" />
            <path d="M3 14.5H21" />
            <path d="M3 19.5H12.47" />
        </svg>
    );
};

export default AlignLeftIcon;
