import { SVGProps } from "@/lib/types/prop.types";

const EyeIcon = (props: SVGProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 6.3499999 6.3500002"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                fill="none"
                stroke="currentColor"
                strokeWidth="0.394917"
                strokeLinecap="round"
                strokeLinejoin="round"
                cx="3.175"
                cy="3.175"
                r="2.5451772" />
            <path
                strokeWidth={0.529167}
                fill="currentColor"
                fillOpacity={1}
                strokeOpacity={1}
                strokeDasharray="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={4}
                d="M 3.1964718,2.7386896 A 2.3515894,1.9430084 0 0 0 1.6919951,3.1903357 2.3515894,1.9430084 0 0 0 3.1535287,3.6113104 2.3515894,1.9430084 0 0 0 4.6580049,3.1596647 2.3515894,1.9430084 0 0 0 3.1964718,2.7386896 Z" />
        </svg>
    );
};

export default EyeIcon;
