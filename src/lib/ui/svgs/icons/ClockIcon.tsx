import { SVGProps } from "@/lib/types/prop.types";

const ClockIcon = (props: SVGProps) => {
    return (
        <svg
            width="20"
            height="20"
            focusable="false"
            viewBox="0 0 12 12"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            {...props}
        >
            <circle
                cx="6"
                cy="6"
                id="circle2"
                r="5.5" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M 5.5,3 V 6.5 L 8,8.3453285"
            />
        </svg>
    );
};

export default ClockIcon;
