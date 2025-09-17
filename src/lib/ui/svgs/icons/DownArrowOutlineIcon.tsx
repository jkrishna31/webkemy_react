import { SVGProps } from "@/types/prop.types";

const DownArrowOutlineIcon = (props: SVGProps) => {
    return (
        <svg
            height="22.010898"
            width="21.98339"
            viewBox="0 0 22.010898 21.98339"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            {...props}
        >
            <g transform="translate(-0.9945515,-1.016659)">
                <g transform="rotate(180,12,12.008354)">
                    <path
                        d="m 10.2,3.1 -8,16 A 2,2 0 0 0 4,22 h 16 a 2,2 0 0 0 1.8,-2.9 l -8,-16 a 2,2 0 0 0 -3.6,0 z"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </g>
            </g>
        </svg>
    );
};

export default DownArrowOutlineIcon;
