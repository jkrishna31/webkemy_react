import { SVGProps } from "@/types/prop.types";

const BookmarkIcon = (props: SVGProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <g transform="translate(-1.5080732,-1.8114118)">
                <path d="M 17.176843,12.134938 H 9.8491534" />
                <path d="M 13.512998,8.5591134 V 15.886862" />
            </g>
            <path
                d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
            />
        </svg>
    );
};

export default BookmarkIcon;
