import { SVGProps } from "@/types/prop.types";

const ChevronRightIcon = (props: SVGProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M8 4L16 12L8 20"></path>
        </svg>
    );
};

export default ChevronRightIcon;
