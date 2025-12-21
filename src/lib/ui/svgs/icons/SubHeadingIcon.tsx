import { SVGProps } from "@/lib/types/prop.types";

const SubHeadingIcon = (props: SVGProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20" height="20"
            fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
            {...props}
        >
            <path d="M15 9h6l-4 4h1a3 3 0 1 1-2.83 3.999M3 5v7m0 0v7m0-7h8m0-7v7m0 0v7" />
        </svg>
    );
};

export default SubHeadingIcon;
