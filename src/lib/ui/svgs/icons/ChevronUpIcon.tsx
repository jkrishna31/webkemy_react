import { SVGProps } from "@/types/prop.types";

const ChevronUpIcon = (props: SVGProps) => {
    return (
        <svg
            width="9.0015249"
            height="5.0017877"
            viewBox="0 0 9.001525 5.0017878"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={{ stroke: "none", strokeWidth: 0, strokeMiterlimit: 4, strokeDasharray: "none" }}
            fill="currentColor"
            {...props}
        >
            <path
                d="m 8.8546316,4.854894 a 0.5,0.5 0 0 1 -0.708,0 l -3.646,-3.6470002 -3.646,3.6470002 a 0.5006316,0.5006316 0 0 1 -0.708,-0.708 l 4,-4.00000022 a 0.5,0.5 0 0 1 0.708,0 l 4,4.00000022 a 0.5,0.5 0 0 1 0,0.708 z"
            />
        </svg>
    );
};

export default ChevronUpIcon;
