import { SVGProps } from "@/types/prop.types";

const CircleCheckIcon = (props: SVGProps) => {
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

                    d="m 15,21 a 1,1 0 0 1 -0.71,-0.29 l -4,-4 a 1.0040916,1.0040916 0 0 1 1.42,-1.42 l 3.29,3.3 6.29,-6.3 a 1.0040916,1.0040916 0 0 1 1.42,1.42 l -7,7 A 1,1 0 0 1 15,21 Z"
                />
                <path
                    d="M 16,29 A 13,13 0 1 1 29,16 13,13 0 0 1 16,29 Z M 16,5 A 11,11 0 1 0 27,16 11,11 0 0 0 16,5 Z"
                />
            </g>
        </svg>
    );
};

export default CircleCheckIcon;
