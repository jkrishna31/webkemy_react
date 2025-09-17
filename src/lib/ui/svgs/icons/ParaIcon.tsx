import { SVGProps } from "@/types/prop.types";

const ParaIcon = (props: SVGProps) => {
    return (
        <svg
            width="20" height="20"
            viewBox="0 0 16 16"
            fill="currentColor"
            fillRule="evenodd"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
        </svg>
    );
};

export default ParaIcon;
