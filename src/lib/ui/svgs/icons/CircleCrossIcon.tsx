import { SVGProps } from "@/lib/types/prop.types";

const CircleCrossIcon = (props: SVGProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26 26"
            version="1.1"
            width="26"
            height="26"
            style={{ fill: "currentColor", fillOpacity: 1 }}

            {...props}
        >
            <g transform="translate(-3,-3)">
                <path
                    d="M 16,29 A 13,13 0 1 1 29,16 13,13 0 0 1 16,29 Z M 16,5 A 11,11 0 1 0 27,16 11,11 0 0 0 16,5 Z"
                />
                <path
                    d="m 11.76,21.24 a 1,1 0 0 1 -0.71,-0.29 1,1 0 0 1 0,-1.41 l 8.49,-8.49 A 1.0148522,1.0148522 0 0 1 21,12.46 L 12.46,21 a 1,1 0 0 1 -0.7,0.24 z"
                />
                <path
                    d="m 20.24,21.24 a 1,1 0 0 1 -0.7,-0.29 l -8.49,-8.49 a 1,1 0 0 1 1.41,-1.41 L 21,19.54 a 1,1 0 0 1 0,1.46 1,1 0 0 1 -0.76,0.24 z"
                />
            </g>
        </svg>
    );
};

export default CircleCrossIcon;
