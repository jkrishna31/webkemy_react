import { SVGProps } from "@/lib/types/prop.types";

const FrameIcon = (props: SVGProps) => {
    return (
        <svg
            fill="none"
            height="20"
            width="20"
            strokeWidth="1.5"
            stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
        >
            <path d="M6 3L6 21" />
            <path d="M18 3L18 21" />
            <path d="M3 6L21 6" />
            <path d="M3 18L21 18" />
        </svg>
    );
};

export default FrameIcon;
