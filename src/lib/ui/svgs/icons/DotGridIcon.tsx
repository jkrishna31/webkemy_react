import { SVGProps } from "@/types/prop.types";

const DotGridIcon = (props: SVGProps) => {
    return (
        <svg
            version="1.1"
            x="0px"
            y="0px"
            width="32.670002"
            height="32.669998"
            viewBox="0 0 32.670002 32.669998"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"

            {...props}
        >
            <g transform="translate(-21.162,-21.497001)">
                <circle
                    cx="25.497"
                    cy="25.832001"
                    r="4.335" />
                <circle
                    cx="49.497002"
                    cy="25.832001"
                    r="4.335" />
                <circle
                    id="circle8"
                    cy="49.832001"
                    cx="25.497"
                    r="4.335" />
                <circle
                    cx="49.497002"
                    cy="49.832001"
                    r="4.335" />
            </g>
        </svg>
    );
};

export default DotGridIcon;
