import { SVGProps } from "@/lib/types/prop.types";

const DropdownListIcon = (props: SVGProps) => {
    return (
        <svg
            width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor" strokeWidth="4" strokeLinecap="round"
            {...props}
        >
            <path d="M40 28L24 40L8 28" strokeLinejoin="round" />
            <path d="M8 10H40" />
            <path d="M8 18H40" />
        </svg>
    );
};

export default DropdownListIcon;
