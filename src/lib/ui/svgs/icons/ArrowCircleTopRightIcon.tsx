import { SVGProps } from "@/lib/types/prop.types";

const ArrowCircleTopRightIcon = (props: SVGProps) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 512 512"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            {...props}
        >
            <polyline
                points="262.62 336 342 256 262.62 176"
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={6}
                transform="matrix(0.78661369,-0.78661369,0.78661369,0.78661369,-151.95359,261.20738)" />
            <line
                x1="319.31058"
                y1="192.68942"
                x2="192.68942"
                y2="319.31058"
                strokeWidth={34}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={6}
            />
            <path
                d="M 256,469.58843 C 373.9186,469.58843 469.58843,373.9186 469.58843,256 469.58843,138.08138 373.9186,42.41157 256,42.41157 138.08138,42.41157 42.41157,138.08138 42.41157,256 c 0,117.9186 95.66981,213.58843 213.58843,213.58843 z"
                strokeWidth={34}
                strokeMiterlimit={6}
            />
        </svg>
    );
};

export default ArrowCircleTopRightIcon;
