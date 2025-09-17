import { SVGProps } from "@/types/prop.types";

const HeadingIcon = (props: SVGProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20" height="20"
            viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
            {...props}
        >
            <path d="M15 12.5V12a3 3 0 0 1 3-3h.172a2.828 2.828 0 0 1 2 4.829L15 19h6M3 5v7m0 0v7m0-7h8m0-7v7m0 0v7" />
        </svg>
    );
};

export default HeadingIcon;
